require("dotenv").config();

const PORT = process.env.PORT || 3001;
const MONGODB_URI =
	process.env.MONGODB_URI || "mongodb://localhost:27017/Backend";

module.exports = {
	PORT,
	MONGODB_URI,
};
