import { Router } from "express";
import userValidations from "../middlewares/userValidations.js";
import validate from "../middlewares/handleValidation.js";
import userController from "../controllers/userController.js";
import checkCookie from "../middlewares/checkCookie.js";

const userRoutes = Router();

userRoutes.post(
  "/login",
  userValidations.userLoginValidation(),
  validate,
  userController.login
);
userRoutes.post(
  "/register",
  userValidations.userCreationValidation(),
  validate,
  userController.register
);
userRoutes.get("/:id/info", checkCookie, userController.getUserInfo);

export default userRoutes;
