import "@shared/container/providers/index";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CarsImageRepository } from "@modules/cars/infra/typeorm/repositories/CarsImageRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";
import { ICarsImageRepository } from "@modules/cars/repositories/ICarsImageRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICateroriesRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { RentalsRepository } from "@modules/rentals/infra/typeorm/repositories/RentalsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { container } from "tsyringe";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";


container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository", CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationsRepository", SpecificationRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository", UsersRepository
);

container.registerSingleton<ICarsRepository>(
  "CarsRepository", CarsRepository
);

container.registerSingleton<ICarsImageRepository>(
  "CarsImageRepository", CarsImageRepository
);


container.registerSingleton<IRentalsRepository>(
  "RentalsRepository", RentalsRepository
);


container.registerSingleton<IUsersTokensRepository>(
  "UsersTokenRepository", UsersTokensRepository
);


