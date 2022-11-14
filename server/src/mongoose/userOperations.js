const userModel = require("./userModel");
const bcryptjs = require("bcryptjs");

async function registerUser(user) {
  try {
    user.password = bcryptjs.hashSync(user.password);
    return await new userModel(user).save();
  } catch {
    return null;
  }
}
async function userSignin(email, password) {
  try {
    const credentialsFromDb = await userModel.findOne({ email: email });
    if (credentialsFromDb == null) return null;

    const result = bcryptjs.compareSync(password, credentialsFromDb.password);
    if (result) {
      return credentialsFromDb;
    }
    return null;
  } catch {
    return null;
  }
}

async function getUserDetailsById(id) {
  try {
    return await userModel.findById(id);
  } catch {
    return null;
  }
}
async function getAllUsers() {
  try {
    return await userModel.find();
  } catch {
    return null;
  }
}
async function updateUser(userid, body) {
  try {
    if (body.password) {
      body.password = bcryptjs.hashSync(body.password);
    }

    const user = await userModel.findByIdAndUpdate({ _id: userid }, body);

    return user;
  } catch {
    return null;
  }
}

module.exports = {
  registerUser,
  userSignin,
  getUserDetailsById,
  getAllUsers,
  updateUser,
};
