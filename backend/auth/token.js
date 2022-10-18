import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  const jwtSecret = process.env.JWT_SECRET
  return jwt.sign({ id: userId }, jwtSecret);
};

