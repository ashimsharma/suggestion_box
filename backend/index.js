import express from "express";
import "dotenv/config";

const app = express();

app.get("/", (req, res) => {
    res.send("Suggestion Box");
})

app.listen(process.env.PORT, () => {
    console.log(`Server Started on port ${process.env.PORT}`)
})