import mongoose from "mongoose";

export const connectDB = async (req , res) => {
    try {
        const dbInstance = await mongoose.connect(process.env.MONGODB_URI);

        if(!dbInstance){
            throw new Error("Database Connection Failed.");
        }

        return dbInstance;
    } catch (error) {
        throw new Error("Database Connection Failed.")
    }
}