import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokenRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProviderInMemory: MailProviderInMemory;

describe('Send Forgot mail', () => {

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokenRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProviderInMemory = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      userRepositoryInMemory,
      usersTokenRepositoryInMemory,
      dateProvider,
      mailProviderInMemory
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, "sendMail");

    await userRepositoryInMemory.create({
      driver_license: "213324",
      email: "ro@wazadlo.ng",
      name: "Antonio",
      password: "1234"
    });

    await sendForgotPasswordMailUseCase.execute("ro@wazadlo.ng");

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send an email if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("mat@gmail.com")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it('should be able to create an users token', async () => {
    const generateTokenMail = jest.spyOn(userRepositoryInMemory, "create");

    await userRepositoryInMemory.create({
      driver_license: "213324",
      email: "ro2@wazadlo.ng",
      name: "Antonio2",
      password: "1234"
    });

    await sendForgotPasswordMailUseCase.execute("ro2@wazadlo.ng");


    expect(generateTokenMail).toBeCalled();
  });
});