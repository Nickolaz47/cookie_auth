import User from "../models/User.js";
import jwt from "jsonwebtoken";

const checkCookie = async (req, res, next) => {
  const { cookies } = req;
  const accessToken = cookies.authAccessCookie;

  const accessSecret = process.env.JWT_ACCESS_SECRET;

  if (!accessToken) {
    return res.status(401).json({ errors: ["Acesso negado!"] });
  }

  jwt.verify(accessToken, accessSecret, async (err, user) => {
    if (err) {
      // Ensure that the logic stops here if exists an error
      return next();
    }
    try {
      req.user = await User.findOne({
        where: { id: user.id },
        attributes: { exclude: ["password"] },
        raw: true,
      });

      next();
    } catch (error) {
      return res.status(403).json({ errors: ["Token inválido!"] });
    }
  });
};

export default checkCookie;
