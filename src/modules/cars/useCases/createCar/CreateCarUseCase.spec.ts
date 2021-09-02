import { CarsRespositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRespositoryInMemory;

describe("Create Car", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRespositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute(
      {
        name: "Name car",
        description: "Description test",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        brand: "Brand",
        category_id: "category",
      }
    );

    expect(car).toHaveProperty("id");
  });

  it("Should not be able to create a car with exists license plate", async () => {
    await createCarUseCase.execute(
      {
        name: "Name car 1",
        description: "Description test",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        brand: "Brand",
        category_id: "category",
      }
    );

    await expect(
      createCarUseCase.execute(
        {
          name: "Name car 2",
          description: "Description test",
          daily_rate: 100,
          license_plate: "ABC-1234",
          fine_amount: 60,
          brand: "Brand",
          category_id: "category",
        }
      )
    ).rejects.toEqual(new AppError("Car already exists"));
  });

  it("Should be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute(
      {
        name: "Name car",
        description: "Description test",
        daily_rate: 100,
        license_plate: "ABCD-1234",
        fine_amount: 60,
        brand: "Brand",
        category_id: "category",
      }
    );

    expect(car.available).toBe(true);
  });
});