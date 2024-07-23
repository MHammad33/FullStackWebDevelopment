const bcrypt = require("bcrypt");
const User = require("../models/user.model");

// GET /api/users
const getUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
}

// POST /api/users
const createUser = async (req, res) => {
  const { username, name, password } = req.body;

  // Hash the password
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // Create a new user
  const newUser = new User({
    username,
    name,
    passwordHash
  });

  // Save the user to the database
  const savedUser = await newUser.save();

  // Return the saved user
  res.status(201).json(savedUser);
};

module.exports = {
  getUsers,
  createUser
};