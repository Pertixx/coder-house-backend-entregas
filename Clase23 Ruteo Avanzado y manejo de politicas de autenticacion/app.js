import UserRouter from "./users";
import express from "express";

const app = express();
const server = app.listen(8080, () => console.log("Listening on port 8080"));

const userRouter = new UserRouter();
app.use("/users", userRouter.getRouter());
