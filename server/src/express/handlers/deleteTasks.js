const operations = require("../../mongoose/taskOperations");

async function deleteTasks(req, res) {
  const task = req.body;
  console.log(task);

  if (task == null) return res.status(400).json("Please provide a Task");

  const taskDeletion = operations.deleteTasks(task);
  if (taskDeletion != null) {
    res.json("Deleted Successfully.");
    return taskDeletion;
  }

  return res.status(401).json("Error occured");
}

module.exports = deleteTasks;
