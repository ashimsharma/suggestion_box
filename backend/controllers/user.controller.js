import { User } from "../models/User.model.js";
import { generateRandomPassword } from "../utils/index.js";

const createAdmin = async (req, res) => {
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

        if(user.role !== "SuperAdmin"){
            return res.status(401)
            .json(
                {
                    message: "Unauthorized Request."
                }
            )
        }

        const { studentID } = req?.body;

        if(!studentID){
            return res.status(301)
            .json(
                {
                    message: "Student Id is required."
                }
            )
        }

        const password = generateRandomPassword(studentID);

        const checkUser = await User.find({studentID});

        if(checkUser){
            return res.status(401)
            .json(
                {
                    message: "User Already Exists."
                }
            )
        }

        const createdUser = await User.create({studentID, password, role: "Admin"});

        return res.status(200)
        .json(
            {
                message: "Admin Created Successfully.",
                data: {password}
            }
        )
    } catch (error) {
        console.log(error?.message);
    }
}

export {createAdmin};