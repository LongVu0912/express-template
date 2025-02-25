import { Router } from "express";
import { authController } from "../../controllers";
import { requireUser, validateRequest } from "../../middleware";
import { loginSchema, changePasswordSchema, registerSchema } from "../../validation/account";
const authRouter = Router();

authRouter.post("/login", validateRequest(loginSchema), authController.login);
authRouter.post("/register", validateRequest(registerSchema), authController.register);
authRouter.put("/changePassword", requireUser, validateRequest(changePasswordSchema), authController.changePassword);

export default authRouter;
