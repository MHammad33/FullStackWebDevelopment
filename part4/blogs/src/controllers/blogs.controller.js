const Blog = require("../models/blog.model");

const createBlog = async (req, res) => {
  const newBlog = new Blog(req.body);

  try {
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createBlog,
};