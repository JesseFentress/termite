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
    const { token } = req.query;
    if (verifyToken(token) !== null) {
        next();
    }
    else {
        res.json({ message: "User is not authenticated." })
    }
};

module.exports = { generateToken, verifyToken, authenticateRequest };