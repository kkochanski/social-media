const Joi = require('joi');

module.exports = Joi.object().keys({
    firstName: Joi.string().alphanum().min(1).max(255).required(),
    lastName: Joi.string().alphanum().min(1).max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(6).max(255).required()
});