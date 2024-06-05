require("dotenv").config();
const jsonwebtoken = require("jsonwebtoken");
const User = require('../models/User');  // Make sure the path is correct

module.exports = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({
      message: "Anda perlu login",
    });
  }

  try {
    const decode = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    req.id = decode.id;

    // Fetch user details including the role
    const user = await User.findById(decode.id);
    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;  // Attach the user object to the request
    next();
  } catch (e) {
    res.status(401).json({
      message: "Illegal login",
    });
  }
};
