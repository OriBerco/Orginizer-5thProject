const operations = require("../../mongoose/userOperations");

async function updateUser(req, res) {
  const userId = req.body._id;
  console.log(userId);
  
  const updatedUser = req.body;
  if (userId == null)
    return res.status(400).json("Please provide user ID");
  const updateUser = operations.updateUser(userId, updatedUser);
  if (updateUser == null) return res.status(401).json("Error occurd");

  return res.json("Updated successfully");
}

module.exports = updateUser;
