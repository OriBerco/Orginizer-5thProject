const joi = require("joi");

const schema = joi.object({
  name: {
    firstName: joi.string().required(),
    lastName: joi.string().required(),
  },
  email: joi.string().required().email(),
  password: joi.string().required().min(6).alphanum(),
  isAdmin: joi.boolean(),
});

function validateUserRegistration(user) {
  return schema.validate(user);
}

module.exports = validateUserRegistration;
