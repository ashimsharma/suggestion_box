import {Router} from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { createAdmin } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route("/create-admin").post(authenticate, createAdmin);

export default userRouter;