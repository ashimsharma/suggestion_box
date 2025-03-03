import express from "express";
import "dotenv/config";
import authRouter from "./routes/auth.route.js";

const app = express();

app.use("/auth", authRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server Started on port ${process.env.PORT}`)
})