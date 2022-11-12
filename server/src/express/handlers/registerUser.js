const operations = require("../../mongoose/userOperations");
const validate = require("../../joi/validateUserRegistration");

async function registerUser(req, res) {
  const { error } = validate(req.body);

  if (error) return res.status(400).json(error.details[0].message);

  const userDetails = await operations.registerUser(req.body);
  if (userDetails == null)
    return res.json("User not added, please check details");
  res.json({
    name: userDetails.name,
    id: userDetails._id,
    email: userDetails.email,
  });
}
module.exports = registerUser;
