import Joi from "joi";

const EMAIL_PATTERN = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
const nameSchema = Joi.string().min(2).max(30).required();
const emailSchema = Joi.string().regex(EMAIL_PATTERN).required();
const passwordSchema = Joi.string().min(8).max(30).required();

export const loginScheme = Joi.object({
  email: emailSchema,
  password: passwordSchema
});

export const profileScheme = Joi.object({
  name: nameSchema,
  email: emailSchema
});

export const registrationScheme = Joi.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});
