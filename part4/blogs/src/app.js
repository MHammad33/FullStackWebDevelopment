const cors = require("cors");
const express = require("express");
const app = express();

const middleware = require("./utils/middleware");
const blogRouter = require("./routes/blogs.routes");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/blogs", blogRouter);

// Export the app module
module.exports = app;