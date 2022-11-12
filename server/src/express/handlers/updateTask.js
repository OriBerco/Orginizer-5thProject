const operations = require("../../mongoose/taskOperations");

async function updateTaskById(req, res) {
  const taskId = req.body._id;
  console.log(taskId);
  
  const updatedTask = req.body;
  if (taskId == null)
    return res.status(400).json("Please provide instrument ID");
  const updateTask = operations.updateTask(taskId, updatedTask);
  if (updateTask == null) return res.status(401).json("Error occurd");

  return res.json("Updated successfully");
}

module.exports = updateTaskById;
