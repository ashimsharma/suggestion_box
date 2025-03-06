import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { isAuthenticated, login, signup } from "../controllers/auth.controller.js";
import { createAdmin } from "../controllers/user.controller.js";

const authRouter = Router();

authRouter.route("/signup").post(signup);
authRouter.route("/login").post(login);
authRouter.route("/check-auth").get(authenticate, isAuthenticated);
authRouter.route("/create-admin").post(authenticate, createAdmin);

export default authRouter;