import jwt from "jsonwebtoken";

// Only dev
const jwtSecret =
  "17cf2510b3565a4a5e45c88c0dfd07b8f78c118ad8c85e88a5cf4e55cdfa0ff89414cd121b64421ab200216350b47b2c65bb2d4f7690539ee8f71324de2f462b";

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, jwtSecret);
};

