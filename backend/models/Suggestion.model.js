import mongoose, {Schema} from "mongoose";

const suggestionSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    body: {
        type: String,
        required: true,
        maxLength: 100
    },
    upvotes: {
        type: Number,
        default: 0,
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

export const Suggestion = mongoose.model('Suggestion', suggestionSchema);