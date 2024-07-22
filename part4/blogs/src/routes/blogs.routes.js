const express = require("express");
const router = express.Router();

const { getBlogs, createBlog, getBlog } = require("../controllers/blogs.controller");

// Routes
router.route("/").get(getBlogs).post(createBlog);
router.route("/:id").get(getBlog);

module.exports = router;