import { Suggestion } from "../models/Suggestion.model.js";
import { User } from "../models/User.model.js";

const postSuggestion = async (req, res) => {
    try {
        const user = req.user;

        if(!user){
            return res.status(401)
            .json(
                {
                    message: "Unauthorized Request."
                }
            )
        }

        const { suggestion } = req?.body;

        if(!suggestion || suggestion.trim() === ""){
            return res.status(301)
            .json(
                {
                    message: "Suggestion is needed."
                }
            )
        }

        const createdSuggestion = await Suggestion.create({owner: user._id, body: suggestion});

        const createdUser = await User.findByIdAndUpdate(user._id, {$push :{suggestions: createdSuggestion._id}}, {new: true});

        return res.status(200)
        .json(
            {
                message: "Suggestion posted successfully."
            }
        )
    } catch (error) {
        console.log(error?.message);
    }
}

const upvoteSuggestion = async (req, res) => {

}

export {postSuggestion, upvoteSuggestion};