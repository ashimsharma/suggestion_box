import { User } from "../models/User.model.js";
import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.headers["Authorization"]?.replace("Bearer ", "");

        if (!token) {
            return res
                .status(401)
                .json(
                    {
                        message: "Token not provided."
                    }
                )
        }

        let decodedToken;

        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            decodedToken = undefined;
        }

        let user = await User.findById(decodedToken?._id).select("-password -suggestions");

        if (!user) {
            return res
                .status(401)
                .json(
                    {
                        message: "User not found."
                    }
                )
        }

        req.user = user;

        next();
    } catch (error) {
        throw new Error(error?.message);
    }
}