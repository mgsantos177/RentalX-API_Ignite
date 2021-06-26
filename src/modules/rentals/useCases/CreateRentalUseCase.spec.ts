import dayjs from "dayjs";
import { AppError } from "@shared/errors/AppError";
import { Rental } from "../infra/typeorm/entities/Rental";
import { RentalsRepositoryInMemory } from "../repositories/inMemory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;


describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(2, "day").toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider);
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "3124312",

      expected_return_date: dayAdd24Hours
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");

  });


  it('should not be able to create a new rental if thre is another open to the same user', async () => {
    await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "12312423",
      expected_return_date: dayAdd24Hours
    });

    expect(async () => (await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "3124312",
      expected_return_date: dayAdd24Hours
    }))
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental to the same car', async () => {
    await createRentalUseCase.execute({
      user_id: "4234523",
      car_id: "532w3rw3",
      expected_return_date: dayAdd24Hours
    });

    expect(async () => (await createRentalUseCase.execute({
      user_id: "5235423",
      car_id: "532w3rw3",
      expected_return_date: dayAdd24Hours
    }))
    ).rejects.toBeInstanceOf(AppError);
  });


  it('should not be able to create a new rental with invalid return time', async () => {

    expect(async () => (await createRentalUseCase.execute({
      user_id: "5235423",
      car_id: "532w3rw3",
      expected_return_date: dayjs().toDate(),
    }))
    ).rejects.toBeInstanceOf(AppError);
  });

});