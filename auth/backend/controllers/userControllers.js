const mongoose = require("mongoose");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: "3d",
  });
};

const signupUser = async (req, res) => {
  const {
    name,
    username,
    password,
    phone_number,
    gender,
    date_of_birth,
    membership_status,
    address,
    profile_picture,
  } = req.body;
  try {
    if (
      !name ||
      !username ||
      !password ||
      !phone_number ||
      !gender ||
      !date_of_birth ||
      !membership_status ||
      !address
    ) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    const userExists = await User.findOne({ username });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const user = await User.create({
      name,
      username,
      password: hashedPassword,
      phone_number,
      gender,
      date_of_birth,
      membership_status,
      address,
      profile_picture,
    });
    if (user) {
      const token = generateToken(user._id);
      res.status(201).json({ username, token });
    } else {
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

//log in user
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      token = generateToken(user._id);
      res.status(200).json({ username, token });
    } else {
      res.status(400);
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
};
