const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
};

const authenticateRequest = (req, res, next) => {
  let { token } = req.query;
  token ?? (token = req.body.token);
  if (verifyToken(token) !== null) {
    req.query.id = jwt.decode(token).id;
    next();
  } else {
    res.json({ message: "User is not authenticated." });
  }
};

module.exports = { generateToken, verifyToken, authenticateRequest };
