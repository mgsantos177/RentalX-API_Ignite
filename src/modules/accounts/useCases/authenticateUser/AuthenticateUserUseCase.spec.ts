import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

let autheticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let usersTokenRepositoryInMemory: UsersTokensRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let dateProvider: DayjsDateProvider;

describe("Authenticate User", () => {

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokenRepositoryInMemory = new UsersTokensRepositoryInMemory();
    autheticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory, usersTokenRepositoryInMemory, dateProvider);
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
    await expect(autheticateUserUseCase.execute({
      email: "false@email.com",
      password: "any"
    })
    ).rejects.toEqual(new AppError("Email or password incorrect!"));
  });


  it("should not be able to authenticate an user with incorrect password", async () => {

    const user: ICreateUserDTO = {
      driver_license: "00123",
      email: "user3@test.com",
      password: "1234",
      name: "User test"
    };

    await createUserUseCase.execute(user);

    expect(
      await autheticateUserUseCase.execute({
        email: user.email,
        password: "1234"
      })

    ).rejects.toEqual(new AppError("Email or password incorrect!"));
  });

  it("should not be able to authenticate an user with incorrect email", async () => {
    const user: ICreateUserDTO = {
      driver_license: "00123",
      email: "user2@test.com",
      password: "1234",
      name: "User test"
    };

    await createUserUseCase.execute(user);

    await expect(
      autheticateUserUseCase.execute({
        email: "erro@test.com",
        password: user.password
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!"));
  });

});