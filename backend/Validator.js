const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2),
    email: Joi.string().min(8).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const LoginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(8).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

module.exports = { registerValidation, LoginValidation };
