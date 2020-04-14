const Joi = require('@hapi/joi');

    const username = Joi.string();
    const email = Joi.string();
    const password = Joi.string();

module.exports = {
    signUpSchema: Joi.object({
        username: username.required(),
        email: email.required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: password.required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        confirmPassword: Joi.ref('password'),
}),
    signInSchema: Joi.object({
        username: username.required(),
        password: password.required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    })
};