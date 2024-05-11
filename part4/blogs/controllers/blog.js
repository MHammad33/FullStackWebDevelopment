const router = require('express').Router();
const Blog = require('../models/blog');

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (error) {
    console.log("Error fetching blogs: ", error);
  }
})


router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      res.status(400).send({ error: error.message });
    } else {
      console.log("Error fetching blog: ", error);
    }
  }
})


router.post('/', (req, res) => {
  const blog = new Blog(req.body);

  if (!blog.title && !blog.url) {
    return res.status(400).json({ error: "Title and URL are required" });
  }

  if (!blog.likes) {
    blog.likes = 0;
  }

  try {
    const savedBlog = blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    console.log("Error saving blog: ", error);
  }

})

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const blog = req.body;
  console.log("Blog: ", blog);

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true, runValidators: true, context: 'query' });
    res.json(updatedBlog);
  } catch (error) {
    console.log("Error updating blog: ", error);
  }

});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Blog.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.log("Error deleting blog: ", error);
  }

});

module.exports = router;