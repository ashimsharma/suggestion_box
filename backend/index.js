import express from "express";
import "dotenv/config";
import authRouter from "./routes/auth.route.js";
import { connectDB } from "./db/index.js";
import cookieParser from "cookie-parser";
import suggestionRouter from "./routes/suggestion.route.js";
import userRouter from "./routes/user.route.js";

const app = express();

app.use(express.json({limit: "16kb"}));
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/suggestion", suggestionRouter);

app.get("/", (req, res) => {
    res.send("Running");
});

connectDB()
.then(data => {
    app.listen(process.env.PORT, () => {
        console.log(`Server Started on port ${process.env.PORT}`)
    })
})
.catch(err => {
    console.log(err?.message)
})
