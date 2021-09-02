import { AutheticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokenController";
import { Router } from "express";


const autheticateRoutes = Router();

const autheticateUserController = new AutheticateUserController();
const refreshTokenController = new RefreshTokenController();

autheticateRoutes.post("/sessions", autheticateUserController.handle);
autheticateRoutes.post("/refresh-token", refreshTokenController.handle);

export { autheticateRoutes };