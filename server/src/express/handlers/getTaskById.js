const operations = require("../../mongoose/taskOperations");

async function getTaskById(req, res) {
  const taskId = req.query.taskId;
  if (!taskId) return res.status(400).json("Please provide ID.");
  const TaskId = await operations.getTaskById(taskId);
  if (TaskId == null) return res.json("Error providing task");

  res.json(TaskId);
}

module.exports = getTaskById;
