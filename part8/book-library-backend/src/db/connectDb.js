const mongoose = require("mongoose");

const connectDb = async (url) => {
	try {
		const connection = await mongoose.connect(url);
		console.log("Connected to database:", connection.connection.name);
	} catch (error) {
		console.error("Error connecting to db:", error);
	}
};

mongoose.set("debug", true);

module.exports = connectDb;
