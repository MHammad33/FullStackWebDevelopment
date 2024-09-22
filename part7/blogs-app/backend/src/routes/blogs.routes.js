const express = require("express");
const router = express.Router();

const {
  getBlogs,
  createBlog,
  getBlog,
  deleteBlog,
  updateBlog,
  addComment
} = require("../controllers/blogs.controller");

// Routes
router.route("/").get(getBlogs).post(createBlog);
router.route("/:id").get(getBlog).delete(deleteBlog).put(updateBlog);
router.route("/:id/comments").post(addComment);

module.exports = router;
