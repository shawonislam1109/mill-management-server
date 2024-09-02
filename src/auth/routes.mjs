import { jwtVerify } from "../../middleware/jwtMiddleware.mjs";
import { loginValidator } from "../../validator/loginValidator.mjs";
import { signupValidator } from "../../validator/signupValidator.mjs";
import {
  signupController,
  loginController,
  getAllUser,
  getUserModelByIdController,
  millStatusController,
} from "./controller.mjs";
import { Router } from "express";

const authRoutes = Router();

authRoutes.post("/signup", signupValidator, signupController);
authRoutes.post("/login", loginValidator, loginController);
authRoutes.get("/allUser", jwtVerify, getAllUser);
authRoutes.get("/:userId", jwtVerify, getUserModelByIdController);
authRoutes.patch("/active/mill-count", jwtVerify, millStatusController);

export default authRoutes;
