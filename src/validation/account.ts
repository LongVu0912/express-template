import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().required(),
  fullName: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

export const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().min(8).required(),
});
