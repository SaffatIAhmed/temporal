const Joi = require('joi');

const schema = Joi.object({
    firstname: Joi.string()
        .alphanum()
        .min(2)
        .max(16)
        .required(),

    lastname: Joi.string()
        .alphanum()
        .min(2)
        .max(16)
        .required(),

    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})


schema.validate({ username: 'abc'});
// -> { value: { username: 'abc', birth_year: 1994 } }

schema.validate({});
// -> { value: {}, error: '"username" is required' }

// Also -

/*
try {
    const value = await schema.validateAsync({ username: 'abc', birth_year: 1994 });
}
catch (err) { }

*/