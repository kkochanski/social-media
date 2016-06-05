const Joi = require('joi');

module.exports = Joi.object().keys({
    firstName: Joi.string().alphanum().min(1).max(255).required(),
    lastName: Joi.string().alphanum().min(1).max(255).required(),
    email: Joi.string().email().required(),
    birthday: Joi.object().keys({
        day: Joi.number().min(1).max(31).required(),
        month: Joi.number().min(1).max(12).required(),
        year: Joi.number().min(1900).max(2500).required()
    }).required(),
    password: Joi.string().alphanum().min(6).max(255).required()
});