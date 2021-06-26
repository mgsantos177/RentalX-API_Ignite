import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let autheticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    autheticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "00123",
      email: "user@test.com",
      password: "1234",
      name: "User test"
    };

    await createUserUseCase.execute(user);

    const result = await autheticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });

    expect(result).toHaveProperty("token");
  });


  it("should not be able to authenticate an nonexistent user", async () => {
    expect(async () => {
      await autheticateUserUseCase.execute({
        email: "false@email.com",
        password: "qualquer"
      });
    }).rejects.toBeInstanceOf(AppError);
  });


  it("should not be able to authenticate an user with incorrect password", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "00123",
        email: "user3@test.com",
        password: "1234",
        name: "User test"
      };

      await createUserUseCase.execute(user);

      await autheticateUserUseCase.execute({
        email: user.email,
        password: "1234"
      });

    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate an user with incorrect email", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "00123",
        email: "user2@test.com",
        password: "1234",
        name: "User test"
      };

      await createUserUseCase.execute(user);

      await autheticateUserUseCase.execute({
        email: "erro@test.com",
        password: user.password
      });

    }).rejects.toBeInstanceOf(AppError);
  });

});