import { Router } from "express";
import userController from "../controllers/userController.js";
import checkAccessCookie from "../middlewares/checkAccessCookie.js";
import checkRefreshCookie from "../middlewares/checkRefreshCookie.js";

const userRoutes = Router();

userRoutes.get(
  "/:id",
  checkAccessCookie,
  checkRefreshCookie,
  userController.getUserInfo
);

export default userRoutes;
