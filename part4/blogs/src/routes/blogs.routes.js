const express = require("express");
const router = express.Router();

const { getBlogs, createBlog } = require("../controllers/blogs.controller");

// Routes
router.route("/").get(getBlogs);
router.route("/").post(createBlog);

module.exports = router;