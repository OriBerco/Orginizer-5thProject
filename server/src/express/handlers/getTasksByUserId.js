const operations = require("../../mongoose/taskOperations");

async function getAllUserTasks(req, res) {
  const tasksUserId = req.userID;

  if (tasksUserId == null) return res.status(400).json("Please provide ID");
  const getUserTasks = await operations.getTasksByUserId(tasksUserId);

  res.json(getUserTasks);
}

module.exports = getAllUserTasks;
