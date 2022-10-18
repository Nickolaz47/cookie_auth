import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../auth/token.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(401).json({ errors: ["Credenciais inválidas!"] });
  }

  const compairPasswords = bcrypt.compareSync(password, user.password);

  if (!compairPasswords) {
    return res.status(401).json({ errors: ["Credenciais inválidas!"] });
  }

  const token = generateToken(user.id);

  res.cookie("authCookie", token, {
    secure: false,
    httpOnly: true,
    expiresIn: new Date(Date.now() + 1000 * 60),
  });

  return res.json({
    id: user.id,
    auth: true,
  });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const checkIfUserExists = await User.findOne({ where: { email } });

  if (checkIfUserExists) {
    return res.status(409).json({ errors: ["O e-mail já está em uso."] });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = { name, email, password: hashedPassword };

  User.create(user)
    .then((newUser) => {
      const token = generateToken(newUser.id);

      res.cookie("authCookie", token, {
        secure: false,
        httpOnly: true,
        expiresIn: new Date(Date.now() + 1000 * 60),
      });

      return res.json({
        id: newUser.id,
        auth: true,
      });
    })
    .catch((err) => console.log(err));
};

const getUserInfo = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ where: { id }, raw: true });
 
  return res.json({ name: user.name, email: user.email });
};

const userController = { login, register, getUserInfo };

export default userController;
