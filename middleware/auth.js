const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  // Get token from the header
  const token = req.header("x-path-token");

  // Check if not token
  if (!token) {
    res.status(401).json({ msg: "Authorization Failed" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).send("Invalid Token");
  }
};
