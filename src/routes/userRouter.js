// user userRouter

import express from "express";
import {
  getAllUsers,
  loginUser,
  registerUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);

export default userRouter;
