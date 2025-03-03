import mongoose, {Schema} from "mongoose";

const commentSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    body: {
        type: String,
        required: true,
        maxLength: 100
    }
});

export const Comment = mongoose.model('Comment', commentSchema);