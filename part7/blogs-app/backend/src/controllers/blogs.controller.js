const jwt = require("jsonwebtoken");

const Blog = require("../models/blog.model");
const User = require("../models/user.model");

// Get all blogs
const getBlogs = async (req, res) => {
  console.log("GET ALL BLOGS");
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  console.log("blogs", blogs);
  res.json(blogs);
};

// Create a new blog
const createBlog = async (req, res) => {
  const { body, token } = req;

  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!decodedToken.id) {
    return res.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  });

  if (!newBlog.title || !newBlog.url) {
    return res.status(400).json({ error: "title or url missing" });
  }

  const savedBlog = await newBlog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  const dataForFrontend = {
    ...savedBlog.toJSON(),
    user: {
      username: user?.username,
      name: user?.name
    }
  };

  res.status(201).json(dataForFrontend);
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
};

// Delete a blog
const deleteBlog = async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  // Find the blog by ID
  const blog = await Blog.findById(id);

  if (!blog) {
    return res.status(404).json({ error: "blog not found" });
  }

  // Check if the user owns the blog
  if (blog.user.toString() !== user._id.toString()) {
    return res.status(403).json({ error: "permission denied" });
  }

  // Delete the blog
  await Blog.findByIdAndDelete(id);

  // Remove the blog reference from the user's blog list
  user.blogs = user.blogs.filter(blog => blog._id.toString() !== id);
  await user.save();

  res.status(204).end();
};

// Update a blog
const updateBlog = async (req, res) => {
  const { user, params, body } = req;
  const { id } = params;
  const blog = body;

  // Find the blog by ID
  const blogToUpdate = await Blog.findById(id);

  // Check if the user owns the blog
  if (blogToUpdate.user.toString() !== user._id.toString()) {
    return res.status(403).json({ error: "permission denied" });
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });

  if (!updatedBlog) {
    return res.status(404).end();
  }

  res.status(200).json(updatedBlog);
};

module.exports = {
  getBlogs,
  createBlog,
  getBlog,
  deleteBlog,
  updateBlog
};
