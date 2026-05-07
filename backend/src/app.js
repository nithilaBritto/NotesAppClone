import express from "express";
import userRouter from "./router/user.router.js";

const app = new express();

app.use(express.json());
app.use("/notes", userRouter);
// app.use("/notes", userRouter);

export default app;
