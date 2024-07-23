const jwt = require("jsonwebtoken");

const Blog = require("../models/blog.model");
const User = require("../models/user.model");

// Get all blogs
const getBlogs = async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
}

const getTokenFrom = (req) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
}

// Create a new blog
const createBlog = async (req, res) => {
  const { body } = req;

  const token = getTokenFrom(req);
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!decodedToken) {
    return res.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })


  if (!newBlog.title || !newBlog.url) {
    return res.status(400).json({ error: "title or url missing" });
  }

  const savedBlog = await newBlog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.status(201).json(savedBlog);
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