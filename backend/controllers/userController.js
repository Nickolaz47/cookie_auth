import User from "../models/User.js";
import bcrypt from "bcryptjs";

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    res.sendStatus(401).json({ errors: ["Credenciais inválidas!"] });
    return;
  }

  const compairPasswords = bcrypt.compareSync(password, user.password);

  if (!compairPasswords) {
    res.sendStatus(401).json({ errors: ["Credenciais inválidas!"] });
    return;
  }

  res.json({ message: "Logado." });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const checkIfUserExists = await User.findOne({ where: { email } });

  if (checkIfUserExists) {
    req.sendStatus(409).json({ errors: ["O e-mail já está em uso."] });
    return;
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = { name, email, password: hashedPassword };

  User.create(user)
    .then((newUser) => {
      res.json({ message: "Cadastro realizado com sucesso." });
    })
    .catch((err) => console.log(err));
};

const userController = { login, register };

export default userController;
