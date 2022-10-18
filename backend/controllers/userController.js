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

  return res.json({
    id: user.id,
    token: generateToken(user.id),
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
      return res.json({
        id: newUser.id,
        token: generateToken(newUser.id),
      });
    })
    .catch((err) => console.log(err));
};

const userController = { login, register };

export default userController;
