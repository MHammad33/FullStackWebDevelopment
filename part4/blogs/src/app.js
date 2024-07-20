const cors = require("cors");
const express = require("express");
const app = express();

const middleware = require("./utils/middleware");

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

// Export the app module
module.exports = app;