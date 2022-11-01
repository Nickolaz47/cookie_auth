import jwt from "jsonwebtoken";
import Token from "../models/Token.js";
import { generateAccessToken } from "../auth/token.js";

const refreshToken = async (req, res) => {
  const { cookies } = req;
  const refreshToken = cookies.authRefreshCookie;
  const originalUrl = req.headers.referer;

  const refreshSecret = process.env.JWT_REFRESH_SECRET;

  if (!refreshToken) {
    return res.status(401).json({ errors: ["Acesso negado!"] });
  }

  const tokenInDb = await Token.findOne({ where: { value: refreshToken } });

  if (!tokenInDb) {
    return res.status(403).json({ errors: ["Token inválido!"] });
  }

  jwt.verify(refreshToken, refreshSecret, async (err, user) => {
    if (err instanceof jwt.TokenExpiredError) {
      return res.redirect("/logout");
    }

    try {
      const newAccessToken = generateAccessToken({ id: user.id });

      res.cookie("authAccessCookie", newAccessToken, {
        secure: false,
        httpOnly: true,
      });

      return res.redirect(originalUrl);
    } catch (error) {
      return res.status(403).json({ errors: ["Token inválido!"] });
    }
  });
};

const tokenController = { refreshToken };
export default tokenController;
