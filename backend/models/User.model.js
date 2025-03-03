import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    studentID :{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['Student', 'Admin', 'SuperAdmin']
    },
    suggestions: [{
        type: Schema.Types.ObjectId,
        ref: 'Suggestion'
    }],
}, {
    timestamps: true
})

export const User = mongoose.model('User', userSchema);