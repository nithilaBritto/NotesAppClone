import express from "express";
import userRouter from "./router/user.router.js";
import postRouter from "./router/posts.router.js";

const app = new express();

app.use(express.json());
app.use("/notes", userRouter);
app.use("/notes", postRouter);

export default app;
