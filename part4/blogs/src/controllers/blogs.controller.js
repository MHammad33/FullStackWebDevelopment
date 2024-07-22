const Blog = require("../models/blog.model");

// Get all blogs
const getBlogs = async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
}

// Create a new blog
const createBlog = async (req, res) => {
  const newBlog = new Blog(req.body);

  if (!newBlog.title || !newBlog.url) {
    return res.status(400).json({ error: "title or url missing" });
  }

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

// Get a single blog
const getBlog = async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findById(id);

  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
}

// Delete a blog
const deleteBlog = async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findByIdAndDelete(id);

  if (!blog) {
    return res.status(404).end();
  }

  res.status(204).end();
}

// Update a blog
const updateBlog = async (req, res) => {
  const { id } = req.params;
  const blog = req.body;

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });

  if (!updatedBlog) {
    return res.status(404).end();
  }

  res.status(200).json(updatedBlog);
}

module.exports = {
  getBlogs, createBlog, getBlog, deleteBlog, updateBlog
};