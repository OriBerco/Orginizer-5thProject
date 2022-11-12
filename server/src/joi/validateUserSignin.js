const joi = require('joi');

const scheme = joi.object({
    email:joi.string().required().email(),
    password:joi.string().required().min(6)
});

function validateUserSignin(user){
    return scheme.validate(user);
}

module.exports = validateUserSignin;