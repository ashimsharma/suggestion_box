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
    upvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    flagged: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
});

export const Suggestion = mongoose.model('Suggestion', suggestionSchema);