import { AutheticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { Router } from "express";


const autheticateRoutes = Router();

const autheticateUserController = new AutheticateUserController();

autheticateRoutes.post("/sessions", autheticateUserController.handle);

export { autheticateRoutes };