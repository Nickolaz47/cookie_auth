import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const accessSecret = process.env.JWT_ACCESS_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;

export const generateAccessToken = (data) => {
  return jwt.sign(data, accessSecret, { expiresIn: "15m" });
};

export const generateRefreshToken = (data) => {
  return jwt.sign(data, refreshSecret, { expiresIn: "7d" });
};
