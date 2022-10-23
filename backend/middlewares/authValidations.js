import { body } from "express-validator";

const authCreationValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("O nome é obrigatório.")
      .isLength({ min: 3 })
      .withMessage("O nome precisa de no mínimo 3 caracteres."),
    body("email")
      .isString()
      .withMessage("O e-mail é obrigatório.")
      .isEmail()
      .withMessage("Insira um e-mail válido."),
    body("password")
      .isString()
      .withMessage("A senha é obrigatória.")
      .isLength({ min: 8 })
      .withMessage("A senha precisa de no mínimo 8 caracteres."),
    body("confirmPassword")
      .isString()
      .withMessage("A confirmação da senha é obrigatória.")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("As senhas não são iguais.");
        }
        return true;
      }),
  ];
};

const authLoginValidation = () => {
  return [
    body("email").isEmail().withMessage("Insira um e-mail válido."),
    body("password").isString().withMessage("Insira a senha."),
  ];
};

const authValidations = { authCreationValidation, authLoginValidation };

export default authValidations;