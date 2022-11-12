const operations = require("../../mongoose/userOperations");

async function getAllUsers(req, res) {
  const user = await operations.getAllUsers();
  res.json(user);
}
module.exports = getAllUsers;
