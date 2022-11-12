const mongoose = require('mongoose');

const taskScheme = mongoose.Schema({
  title: String,
  taskName: String,
  endDate: String,
  description: String,
  status: Boolean,
  userId: String,
});

module.exports = mongoose.model("task", taskScheme);