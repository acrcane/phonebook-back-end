import express from "express";
import { signupSchema, loginSchema } from "../schemas/usersSchemas.js";
import validateBody from "../helpers/validateBody.js";
import {
  signup,
  login,
  logout,
  getCurrent,
} from "../controllers/usersControllers.js";
import { validToken } from "../middlewares/isValidToken.js";
const userRouter = express.Router();

userRouter.post("/signup", validateBody(signupSchema), signup);
userRouter.post("/login", validateBody(loginSchema), login);
userRouter.post("/logout", validToken, logout);
userRouter.get("/current", validToken, getCurrent);

export default userRouter;
