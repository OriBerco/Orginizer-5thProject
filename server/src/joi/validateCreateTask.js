const joi = require("joi");

const scheme = joi.object({
  id: joi.any().required(),
  userId: joi.string().required(),
  title: joi.string().required(),
  description: joi.string().required(),
  status: joi.boolean().required(),
  taskName: joi.string().required(),
  endDate: joi.string().required(),
});

function validateTask(task) {
  return scheme.validate(task);
}
module.exports = validateTask;
