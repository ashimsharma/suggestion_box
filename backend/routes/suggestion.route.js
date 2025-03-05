import {Router} from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { commentSuggestion, postSuggestion, upvoteSuggestion } from "../controllers/suggestion.controller.js";

const suggestionRouter = Router();

suggestionRouter.route("/post-suggestion").post(authenticate, postSuggestion);
suggestionRouter.route("/upvote-suggestion").post(authenticate, upvoteSuggestion);
suggestionRouter.route("/comment-suggestion").post(authenticate, commentSuggestion);

export default suggestionRouter;