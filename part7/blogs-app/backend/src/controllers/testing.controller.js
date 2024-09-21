const Blog = require("../models/blog.model");
const User = require("../models/user.model");

// POST /api/tests/reset (Clear Database)s
const reset = async (req, res) => {
  await User.deleteMany({});
  await Blog.deleteMany({});
  res.status(204).end();
}

module.exports = {
  reset
}