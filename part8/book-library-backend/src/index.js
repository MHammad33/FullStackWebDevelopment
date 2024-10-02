const app = require("./app");
const config = require("./utils/config");
const connectDb = require("./db/connectDb");

const startServer = async () => {
	try {
		await connectDb(config.MONGODB_URI);
		app.listen(config.PORT, () =>
			console.log("Listening on port:", config.PORT)
		);
	} catch (error) {
		console.error("Error starting server...", error);
	}
};

startServer();
