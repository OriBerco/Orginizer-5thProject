const jwt = require("jsonwebtoken");

async function authenticateUser(req, res, next) {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json("Token not provided.");
  try {
    const data = jwt.verify(token, "jig");

    req.userID = data.userid;
    next();
  } catch {
    return res.status(401).json({ message: "Ilegal token" });
  }
}
module.exports = authenticateUser;
