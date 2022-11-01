import { Router } from "express";
import userController from "../controllers/userController.js";
import checkAccessCookie from "../middlewares/checkAccessCookie.js";

const userRoutes = Router();

userRoutes.get(
  "/:id",
  checkAccessCookie,
  userController.getUserInfo
);

export default userRoutes;
