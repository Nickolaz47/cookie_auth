import { Router } from "express";
import tokenController from "../controllers/tokenController.js";

const tokenRoutes = Router();

tokenRoutes.get("/refresh", tokenController.refreshToken);

export default tokenRoutes;
