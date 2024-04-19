const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');

// Models and Schema
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});


const Blog = mongoose.model('Blog', blogSchema);

// Connect to the MongoDB database
mongoose.connect(config.MONGODB_URI, {
  dbName: "Backend",
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message);
  });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/blogs', (req, res) => {
  Blog
    .find({})
    .then(blogs => {
      res.json(blogs);
    })
    .catch(error => {
      console.log("Error fetching blogs: ", error);
    });
})

app.post('/api/blogs', (req, res) => {
  console.log(req.body);
  const blog = new Blog(req.body);
  blog
    .save()
    .then(result => {
      res.status(201).json(result);
    })
    .catch(error => {
      console.log("Error saving blog: ", error);
    });
})



// Export the app module
module.exports = app;