require("dotenv").config();
const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");


exports.LoginUser = async (req, res) => {
  const { username, password } = req.body;
  const dataUser = await User.findOne({ $or: [{ username: username }] });
  
  if (dataUser) {
    // if the username exists
    const passwordUser = await bcryptjs.compare(password, dataUser.password);
    
    if (passwordUser) {
      // if the password is correct
      const data = {
        id: dataUser._id,
      };
      const token = jsonwebtoken.sign(data, process.env.JWT_SECRET);
      return res.status(201).json({
        message: "berhasil",
        token: token,
        role: dataUser.role, // retrieve the role from dataUser
      });
    } else {
      // if the password is incorrect
      return res.status(404).json({
        status: false,
        message: "Password yang dimasukkan salah",
      });
    }
  } else {
    // if the username doesn't exist
    return res.status(404).json({
      status: false,
      message: "Username atau Email yang dimasukkan salah",
    });
  }
};

exports.RegisterUser = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ $or: [{ username }] });
    
    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "Username already exists",
      });
    }
    
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      role,
    });
    
    await newUser.save();
    
    return res.status(201).json({
      status: true,
      message: "User registered successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "An error occurred while registering",
      error: error.message,
    });
  }
};

