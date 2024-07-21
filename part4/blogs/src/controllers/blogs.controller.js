const Blog = require("../models/blog.model");

// Get all blogs
const getBlogs = async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
}

// Create a new blog
const createBlog = async (req, res) => {
  const newBlog = new Blog(req.body);

  if (!newBlog.likes) {
    newBlog.likes = 0;
  }

  try {
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getBlogs, createBlog
};