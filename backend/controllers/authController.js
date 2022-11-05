import User from "../models/User.js";
import Token from "../models/Token.js";
import { encryptData, decryptData } from "../auth/encryptData.js";
import { generateAccessToken, generateRefreshToken } from "../auth/token.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(401).json({ errors: ["Credenciais inválidas!"] });
  }

  const compairPasswords = decryptData(password, user.password);

  if (!compairPasswords) {
    return res.status(401).json({ errors: ["Credenciais inválidas!"] });
  }

  const accessToken = generateAccessToken({ id: user.id });
  const refreshToken = generateRefreshToken({ id: user.id });

  const hashedRefreshToken = encryptData(refreshToken);
  await Token.create({ value: hashedRefreshToken, UserId: user.id });

  res
    .cookie("authAccessCookie", accessToken, {
      secure: false,
      httpOnly: true,
    })
    .cookie("authRefreshCookie", refreshToken, {
      secure: false,
      httpOnly: true,
    });

  return res.json({
    id: user.id,
  });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const checkIfUserExists = await User.findOne({ where: { email } });

  if (checkIfUserExists) {
    return res.status(409).json({ errors: ["O e-mail já está em uso."] });
  }

  const hashedPassword = encryptData(password);

  const user = { name, email, password: hashedPassword };

  User.create(user)
    .then((newUser) => {
      const accessToken = generateAccessToken({ id: newUser.id });
      const refreshToken = generateRefreshToken({ id: newUser.id });

      const hashedRefreshToken = encryptData(refreshToken);
      Token.create({ value: hashedRefreshToken, UserId: newUser.id });

      res
        .cookie("authAccessCookie", accessToken, {
          secure: false,
          httpOnly: true,
        })
        .cookie("authRefreshCookie", refreshToken, {
          secure: false,
          httpOnly: true,
        });

      return res.status(201).json({
        id: newUser.id,
      });
    })
    .catch((err) => console.log(err));
};

const logout = async (req, res) => {
  const { authRefreshCookie } = req.cookies;

  res.clearCookie("authAccessCookie");
  res.clearCookie("authRefreshCookie");

  // Find all tokens
  const tokens = await Token.findAll({ raw: true });
  // Getting the token with the same value
  const { value: tokenValue } = tokens.find(
    (token) => decryptData(authRefreshCookie, token.value) === true
  );
  // Removing the token from db
  await Token.destroy({ where: { value: tokenValue } });

  return res.json({ auth: false });
};

const authController = { register, login, logout };
export default authController;
