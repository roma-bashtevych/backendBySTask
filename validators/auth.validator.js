const Joi = require('joi');

const { constants: { PASSWORD_REGEXP} } = require('../configuration');

const authValidator = Joi.object({
    username: Joi.string().required().alphanum(),
    password: Joi.string().regex(PASSWORD_REGEXP).required()
});

module.exports = {
    authValidator
};
