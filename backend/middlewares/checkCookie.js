import User from "../models/User.js";
import jwt from "jsonwebtoken";

const checkCookie = async (req, res, next) => {
  const { cookies } = req;
  const token = cookies.authCookie;

  const jwtSecret = process.env.JWT_SECRET;

  if (!token) {
    return res.status(401).json({ errors: ["Acesso negado!"] });
  }

  try {
    const { id } = jwt.verify(token, jwtSecret);
    req.user = await User.findOne({
      where: { id },
      attributes: { exclude: ["password"] },
      raw: true,
    });
    
    next();
  } catch (err) {
    return res.status(400).json({ errors: ["Token inválido!"] });
  }
};

export default checkCookie;
