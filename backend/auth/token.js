import jwt from "jsonwebtoken";

export const generateToken = (data, secret) => {
  return jwt.sign(data, secret);
};
