const operations = require("../../mongoose/userOperations");
const validate = require("../../joi/validateUserSignin");
const jwt = require("jsonwebtoken");

async function signinUser(req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  const { email, password } = req.body;
  const credentialsFromDB = await operations.userSignin(email, password);
  if (credentialsFromDB == null)
    res.status(401).json("Username or password is incorrect");
  else {
    const accessToken = jwt.sign(
      {
        userid: credentialsFromDB._id,
      },
      "jig"
    );
    res.json(accessToken);
  }
}
module.exports = signinUser;
