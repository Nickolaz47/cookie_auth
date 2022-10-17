import { validationResult } from "express-validator";

const validate = (req, res, next) => {
  const errors = validationResult(req).errors.map((err) => err.msg);

  if (errors.length === 0) {
    return next();
  }

  return res.sendStatus(422).json({ errors });
};

export default validate;
