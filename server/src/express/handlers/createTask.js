const operations = require("../../mongoose/taskOperations");
const validate = require("../../joi/validateCreateTask");

async function createTask(req, res) {
  const result = validate(req.body);
  if (result.error)
    return res.status(400).json(result.error.details[0].message);
  req.body.userId = req.userID;
  const task = await operations.createTask(req.body);

  if (task == null) {
    return res.status(500).json("Error, task not saved.");
  }
  res.json(task);
}

module.exports = createTask;
