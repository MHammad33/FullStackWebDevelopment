require("express-async-errors");

const cors = require("cors");
const express = require("express");
const app = express();

const middleware = require("./utils/middleware");
const errorHandler = require("./utils/error-handler");
const blogRouter = require("./routes/blogs.routes");
const usersRouter = require("./routes/users.routes");
const authRouter = require("./routes/auth.routes");
const testingRouter = require("./routes/testing.routes");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/blogs", middleware.userExtractor, blogRouter);
app.use("/api/users", usersRouter);
app.use("/api", authRouter);

if (process.env.NODE_ENV === "test") {
  app.use("/api/tests", testingRouter);
}

// Error handler middleware
app.use(errorHandler);

// Export the app module
module.exports = app;