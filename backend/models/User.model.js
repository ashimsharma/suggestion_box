import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

userSchema.pre('save', async function(next){
    if(!this.isModified("password")){
        next();
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.pre("findOneAndUpdate", async function(next){
    const password = (this.getUpdate().password);

    if(!password){
        next();
        return;
    }
    this.getUpdate().password = await bcrypt.hash(password, 10);
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            studentID: this.studentID
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRY
        }
    );
}

export const User = mongoose.model('User', userSchema);