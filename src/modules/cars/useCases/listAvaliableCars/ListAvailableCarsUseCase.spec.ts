import { CarsRespositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRespositoryInMemory;

describe('List Avaliable Cars', () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRespositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "Up",
      "description": "Lana",
      "daily_rate": 130,
      "license_plate": "VGA-5312",
      "fine_amount": 100,
      "brand": "VW",
      "category_id": "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "Up",
      "description": "Lana",
      "daily_rate": 130,
      "license_plate": "VGA-5312",
      "fine_amount": 100,
      "brand": "VW_TEST",
      "category_id": "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({ brand: "VW_TEST" });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "Fiesta",
      "description": "Rachel",
      "daily_rate": 130,
      "license_plate": "VGA-53125",
      "fine_amount": 100,
      "brand": "VW_TEST",
      "category_id": "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({ name: "Fiesta" });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "Fiesta 2",
      "description": "Rachel 2",
      "daily_rate": 130,
      "license_plate": "VGA-531252",
      "fine_amount": 100,
      "brand": "VW_TEST",
      "category_id": "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({ category_id: "category_id" });

    expect(cars).toEqual([car]);
  });
});