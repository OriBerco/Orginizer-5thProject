const joi = require("joi");

const schema = joi.object({
  name: {
    firstName: joi.string().required().messages({
      "string.base": `First name should be a type of 'text'`,
      "string.empty": `First name cannot be empty`,
      "any.required": `First name is required `,
    }),
    lastName: joi.string().required().messages({
      "string.base": `Last name should be a type of 'text'`,
      "string.empty": `Last name cannot be empty`,
      "any.required": `Last name is required `,
    }),
  },
  email: joi.string().required().email().messages({
    "string.base": `Email should be a type of 'text'`,
    "string.empty": `Email cannot be empty`,
    "string.email": `Email should be valid`,
    "any.required": `Email is required `,
  }),
  password: joi.string().required().min(6).alphanum().messages({
    "string.base": `Password should be a type of 'text'`,
    "string.empty": `Password cannot be empty`,
    "string.min": `Password should have a minimum length of {#limit}`,
    "any.required": `Password is required `,
  }),
  isAdmin: joi.boolean(),
});

function validateUserRegistration(user) {
  return schema.validate(user);
}

module.exports = validateUserRegistration;
