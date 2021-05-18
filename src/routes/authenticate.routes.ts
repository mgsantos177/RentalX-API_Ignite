import { Router } from "express";
import { AutheticateUserController } from "../modules/accounts/useCases/authenticateUser/AuthenticateUserController";

const autheticateRoutes = Router();

const autheticateUserController = new AutheticateUserController();

autheticateRoutes.post("/sessions", autheticateUserController.handle);

export { autheticateRoutes };