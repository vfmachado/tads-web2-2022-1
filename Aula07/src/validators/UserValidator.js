const Joi = require('joi');

const UserValidator = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(120)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    email: Joi.string()
        .email({ minDomainSegments: 2 })
});

module.exports = { UserValidator };
