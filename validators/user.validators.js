const Joi = require('joi');
const { constants: { EMAIL_REGEXP, PASSWORD_REGEXP }, userTypeEnum } = require('../configuration');

const queryUserValidator = Joi.object({
  username: Joi.string()
    .min(2)
    .max(10)
    .trim(),
  firstName: Joi.string()
    .min(2)
    .max(15)
    .trim(),
  lastName: Joi.string()
    .min(2)
    .max(15)
    .trim(),
  email: Joi.string()
    .regex(EMAIL_REGEXP)
    .trim(),
  role: Joi.string()
    .allow(...Object.values(userTypeEnum))
});

const createUserValidator = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .trim()
    .required(),
  firstName: Joi.string()
    .min(2)
    .max(15)
    .trim(),
  lastName: Joi.string()
    .min(2)
    .max(15)
    .trim(),
  password: Joi.string()
    .alphanum()
    .regex(PASSWORD_REGEXP)
    .trim()
    .required(),
  email: Joi.string()
    .regex(EMAIL_REGEXP)
    .required(),
  role: Joi.string()
    .allow(...Object.values(userTypeEnum))
});

const updateUserValidator = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .trim(),
  firstName: Joi.string()
    .min(2)
    .max(15)
    .trim(),
  lastName: Joi.string()
    .min(2)
    .max(15)
    .trim(),
  email: Joi.string()
    .regex(EMAIL_REGEXP)
});

const paramsUserValidator = Joi.object({
  user_id: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .trim()
});

module.exports = {
  queryUserValidator,
  createUserValidator,
  updateUserValidator,
  paramsUserValidator
};
