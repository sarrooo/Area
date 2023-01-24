import { Router } from "express";
import { loginUserSchema, registerUserSchema } from "~/schemas/user.schema";
import { validate } from "~/middlewares/validate";
import dotenv from "dotenv";
import {
  login,
  logout,
  refresh,
  register,
} from "~/controllers/auth/auth.controller";

dotenv.config();

const authRoutes = Router();

authRoutes.post("/login", validate(loginUserSchema), login);
authRoutes.post("/register", validate(registerUserSchema), register);
authRoutes.post("/refresh", refresh);
authRoutes.post("/logout", logout);

export default authRoutes;
