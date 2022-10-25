import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../auth/token.js";

const checkRefreshCookie = async (req, res, next) => {
  const { cookies, user } = req;
  const refreshToken = cookies.authRefreshCookie;

  const refreshSecret = process.env.JWT_REFRESH_SECRET;

  if (!refreshToken) {
    return res.status(401).json({ errors: ["Acesso negado!"] });
  }

  if (user) {
    return next();
  }

  jwt.verify(refreshToken, refreshSecret, async (err, user) => {
    if (err) {
      return res.status(403).json({ errors: ["Token inválido!"] });
    }
    try {
      req.user = await User.findOne({
        where: { id: user.id },
        attributes: { exclude: ["password"] },
        raw: true,
      });

      const newAccessToken = generateAccessToken({ id: user.id });

      res.cookie("authAccessCookie", newAccessToken, {
        secure: false,
        httpOnly: true,
      });

      return next();
    } catch (error) {
      return res.status(403).json({ errors: ["Token inválido!"] });
    }
  });
};

export default checkRefreshCookie;
