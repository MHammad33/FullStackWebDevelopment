const app = require("./app");
const connectDb = require("./db/connectDb");
const config = require("./utils/config");
const logger = require("./utils/logger");

// Start the server
const start = async () => {
  try {
    await connectDb(config.MONGODB_URI);
    app.listen(config.PORT, () => {
      logger.info(`Server running on port ${config.PORT}`);
    });
  } catch (err) {
    logger.error("Error connecting to the database: ", err.message);
  }
}

start();