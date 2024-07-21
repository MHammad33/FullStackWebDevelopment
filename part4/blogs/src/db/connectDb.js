const mongoose = require("mongoose");

const connectDb = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Connected to the database", url);
  } catch (err) {
    console.error("Error connecting to the database: ", err.message);
  }
}

module.exports = connectDb;