const bcrypt = require("bcrypt");
const User = require("../models/user.model");

// GET /api/users
const getUsers = async (req, res) => {
  const users = await User.find({}).populate("blogs", { title: 1, author: 1, url: 1, likes: 1 });
  res.json(users);
}

// POST /api/users
const createUser = async (req, res) => {
  const { username, name, password } = req.body;

  // Validate the request body
  if (!password || password.length < 3) {
    return res
      .status(400)
      .json({ error: "Password is required and must be at least 3 characters long." });
  }

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