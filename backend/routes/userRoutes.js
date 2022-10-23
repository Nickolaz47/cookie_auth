import { Router } from "express";
import userController from "../controllers/userController.js";
import checkCookie from "../middlewares/checkCookie.js";

const userRoutes = Router();

userRoutes.get("/:id", checkCookie, userController.getUserInfo);

export default userRoutes;
