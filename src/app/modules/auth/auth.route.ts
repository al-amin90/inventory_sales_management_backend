import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";

const router = Router();

router.post(
  "/register",
  validateRequest(AuthValidation.registerUserValidation),
  AuthController.registerUser,
);

router.post(
  "/login",
  validateRequest(AuthValidation.loginValidation),
  AuthController.login,
);

export const authRouter = router;
