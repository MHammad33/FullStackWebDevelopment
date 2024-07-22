const express = require("express");
const router = express.Router();

const { getBlogs, createBlog, getBlog, deleteBlog, updateBlog } = require("../controllers/blogs.controller");

// Routes
router.route("/").get(getBlogs).post(createBlog);
router.route("/:id").get(getBlog).delete(deleteBlog).put(updateBlog);

module.exports = router;