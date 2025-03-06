import { User } from "../models/User.model.js";

const signup = async (req, res) => {
    try {
        const {studentID, password} = req?.body;
    
        if (
            [studentID].some((field) => field?.trim() === "")
        ) {
            return res
                .status(401)
                .json(
                    {
                        message: "All fields are required."
                    }
                )
        }

        const existingUser = await User.findOne({studentID});

        if(existingUser){
            return res
            .status(409)
            .json(
                {
                    message: "User already exists"
                }
            )
        }

        const user = await User.create({studentID, password, role: "Student"});

        res.
        status(200)
        .json(
            {
                message: "User created successfully."
            }
        )
    } catch (error) {
        console.log(error?.message);
    }
}

const login = async (req, res) => {
    try {
        const {studentID, password} = req?.body;

        if (!studentID || !password) {
            return res
                .status(400)
                .json(
                    {
                        message: "Email and Password are required."
                    }
                )
        }

        const user = await User.findOne({ studentID });

        if (!user) {
            return res
                .status(404)
                .json(
                    {
                        message: "User not found."
                    }
                )
        }

        const passwordCorrect = await user.isPasswordCorrect(password);

        if (!passwordCorrect) {
            return res
                .status(401)
                .json(
                    {
                        message: "Wrong Password."
                    }
                )
        }

        const accessToken = await user.generateAccessToken();

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .json(
                {
                    data: { accessToken },
                    message: "User logged in successfully."
                }
            )
    } catch (error) {
        console.log(error?.message);
    }
}

const isAuthenticated = (req, res) => {
    const user = req?.user;

    if (!user) {
        return res
            .status(401)
            .json(
                {
                    message: "Unauthorized Request."
                }
            )
    }

    return res
        .status(200)
        .json(
            {
                message: "Authorized User.",
                data: { role: user.role }
            }
        )
}

export {signup, login, isAuthenticated};