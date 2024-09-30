import { Router } from "express";
import { getUser, getAllUsers } from "../controller/user.js";
import { auth } from "../middlewares/auth.js";
import { isSuperAdmin } from "../middlewares/isSuperAdmin.js";

export const userRouter = Router();

userRouter.get("/", [auth], getUser);

userRouter.get('/all', [auth, isSuperAdmin], getAllUsers);