import { Router } from "express";
import authValidations from "../middlewares/authValidations.js";
import validate from "../middlewares/handleValidation.js";
import authController from "../controllers/authController.js";

const authRoutes = Router();

authRoutes.post(
  "/login",
  authValidations.authLoginValidation(),
  validate,
  authController.login
);
authRoutes.post(
  "/register",
  authValidations.authCreationValidation(),
  validate,
  authController.register
);
authRoutes.get("/logout", authController.logout);

export default authRoutes;
