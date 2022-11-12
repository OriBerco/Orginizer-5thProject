const operations = require("../../mongoose/taskOperations");

async function deleteOneTask(req, res) {
  const taskId = req.body.id;

  if (taskId == null) return res.status(400).json("Please provide ID");

  const taskDeletion = operations.deleteTask(taskId);
  if (taskDeletion != null) {
    res.json("Deleted Successfully.");
    return taskDeletion;
  }

  return res.status(401).json("Error occured");
}

module.exports = deleteOneTask;
