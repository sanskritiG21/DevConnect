import { Router } from "express";
import { login, register } from "../controller/auth.js";

export const authRouter = Router();

authRouter.get("/login", login);
authRouter.post("/register", register);

