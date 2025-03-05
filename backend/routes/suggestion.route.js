import {Router} from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { postSuggestion } from "../controllers/suggestion.controller.js";

const suggestionRouter = Router();

suggestionRouter.route("/post-suggestion").post(authenticate, postSuggestion);

export default suggestionRouter;