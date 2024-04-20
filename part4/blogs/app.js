const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const { info } = require('./utils/logger');
const { requestLogger } = require('./utils/middleware');

// Connect to the MongoDB database
mongoose.connect(config.MONGODB_URI, {
  dbName: "Backend",
})
  .then(() => {
    info('Connected to MongoDB');
  })
  .catch((error) => {
    error('Error connecting to MongoDB:', error.message);
  });

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Routes
const blogRouter = require('./controllers/blog');
app.use('/api/blogs', blogRouter);

// Export the app module
module.exports = app;