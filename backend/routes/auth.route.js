import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { login, signup } from "../controllers/auth.controller.js";

const authRouter = Router();


authRouter.route("/signup").post(signup);
authRouter.route("/login").post(login);


export default authRouter;