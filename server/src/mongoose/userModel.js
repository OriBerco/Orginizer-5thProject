const mongoose = require("mongoose");

const UserScheme = mongoose.Schema({
  name: { firstName: String, lastName: String },
  email: {
    type: String,
    unique: true,
  },
  password: String,
  isAdmin: Boolean,
  createDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", UserScheme);
