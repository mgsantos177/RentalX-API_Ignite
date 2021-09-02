import dayjs from "dayjs";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CarsRespositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRespositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(2, "day").toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRespositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory);
  });

  it('should be able to create a new rental', async () => {

    const car = await carsRepositoryInMemory.create({
      name: "Test car",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "Test"
    });


    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,

      expected_return_date: dayAdd24Hours
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");

  });

  it('should not be able to create a new rental if there is another open to the same user', async () => {

    await rentalsRepositoryInMemory.create({
      user_id: "12345",
      car_id: "dsafea",
      expected_return_date: dayAdd24Hours
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: "3124312",
        expected_return_date: dayAdd24Hours
      })
    ).rejects.toEqual(new AppError("There's a rental in progress for user!"));
  });

  it('should not be able to create a new rental to the same car', async () => {

    const car = await carsRepositoryInMemory.create({
      name: "Test car",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "Test"
    });

    await createRentalUseCase.execute({
      user_id: "4234523",
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    });

    await expect(createRentalUseCase.execute({
      user_id: "5235423",
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    })
    ).rejects.toEqual(new AppError("Car is unavailable"));
  });


  it('should not be able to create a new rental with invalid return time', async () => {

    await expect(createRentalUseCase.execute({
      user_id: "5235423",
      car_id: "532w3rw3",
      expected_return_date: dayjs().toDate(),
    })
    ).rejects.toEqual(new AppError("Invalid return time!"));
  });

});