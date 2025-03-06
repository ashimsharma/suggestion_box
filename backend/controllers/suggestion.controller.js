import mongoose from "mongoose";
import { Suggestion } from "../models/Suggestion.model.js";
import { User } from "../models/User.model.js";
import { Comment } from "../models/Comment.model.js";
import { checkMessage } from "../utils/index.js";

const postSuggestion = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401)
                .json(
                    {
                        message: "Unauthorized Request."
                    }
                )
        }

        const { suggestion } = req?.body;


        let flagged = await checkMessage(suggestion);

        if (!suggestion || suggestion.trim() === "") {
            return res.status(301)
                .json(
                    {
                        message: "Suggestion is needed."
                    }
                )
        }

        const createdSuggestion = await Suggestion.create({ owner: user._id, body: suggestion, flagged });

        const createdUser = await User.findByIdAndUpdate(user._id, { $push: { suggestions: createdSuggestion._id } }, { new: true });

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
    try {
        const user = req.user;
    
        if (!user) {
            return res.status(401)
                .json(
                    {
                        message: "Unauthorized Request."
                    }
                )
        }
    
        const {suggestionID} = req?.body;
    
        if(!suggestionID){
            return res.status(301)
            .json(
                {
                    message: "Bad Request."
                }
            )
        }
        const foundSuggestion = await Suggestion.findById(suggestionID);
    
        if(!foundSuggestion){
            return res.status(404)
            .json(
                {
                    message: "Suggestion not found."
                }
            )
        }

        if(new mongoose.Types.ObjectId(foundSuggestion.owner).equals(new mongoose.Types.ObjectId(user._id))){
            return res.status(401)
            .json(
                {
                    message: "Cannot upvote your own suggestion."
                }
            )
        }

        if(foundSuggestion.upvotes.includes(new mongoose.Types.ObjectId(user._id))){
            return res.status(402)
            .json(
                {
                    message: "Already Upvoted."
                }
            )
        }
    
        await Suggestion.findByIdAndUpdate(suggestionID, {$push: {upvotes: user._id}}, {new: true});
    
        return res.status(200)
        .json(
            {
                message: "Upvote Successfull."
            }
        )
    } catch (error) {
        console.log(error?.message);
    }
}

const commentSuggestion = async (req, res) => {
    try {
        const user = req.user;
    
        if (!user) {
            return res.status(401)
                .json(
                    {
                        message: "Unauthorized Request."
                    }
                )
        }
    
        const {suggestionID, comment} = req?.body;
    
        if(!suggestionID){
            return res.status(301)
            .json(
                {
                    message: "Bad Request."
                }
            )
        }
        const foundSuggestion = await Suggestion.findById(suggestionID);
    
        if(!foundSuggestion){
            return res.status(404)
            .json(
                {
                    message: "Suggestion not found."
                }
            )
        }

        if(new mongoose.Types.ObjectId(foundSuggestion.owner).equals(new mongoose.Types.ObjectId(user._id))){
            return res.status(401)
            .json(
                {
                    message: "Cannot comment your own suggestion."
                }
            )
        }
        
        const createdComment = await Comment.create({owner: user._id, body: comment, commentedOn: foundSuggestion._id});

        

        await Suggestion.findByIdAndUpdate(suggestionID, {$push: {comments: createdComment._id}}, {new: true});
    
        return res.status(200)
        .json(
            {
                message: "Comment Successfull."
            }
        )
    } catch (error) {
        console.log(error?.message);
    }
}
export { postSuggestion, upvoteSuggestion, commentSuggestion };