import express from "express";
import { userGetList } from "../controllers/UserController";

const userRouter = express.Router();

userRouter.get("/userlist", userGetList);

export default userRouter;