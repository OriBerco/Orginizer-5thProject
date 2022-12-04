const taskModel = require("./taskModel");

async function createTask(taskDetails) {
  try {
    const createdTask = await new taskModel(taskDetails).save();

    return createdTask;
  } catch {
    return null;
  }
}

async function getTaskById(taskId) {
  try {
    const task = await taskModel.find({
      _id: taskId,
    });

    return task;
  } catch {
    return null;
  }
}

async function updateTask(taskid, body) {
  try {
    const task = await taskModel.findByIdAndUpdate({ _id: taskid }, body);

    return task;
  } catch {
    return null;
  }
}

async function deleteTask(taskId) {
  try {
    const task = await taskModel.findByIdAndDelete({ _id: taskId });
    return task;
  } catch {
    return null;
  }
}
async function deleteTasks(task) {
  try {
    const tasks = await taskModel.deleteMany(task);
    return tasks;
  } catch {
    return null;
  }
}

async function getTasksByUserId(id) {
  try {
    const tasksOfUser = await taskModel.find({ userId: id });

    return tasksOfUser;
  } catch {
    return null;
  }
}
module.exports = {
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksByUserId,
  deleteTasks,
};
