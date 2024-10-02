const app = require("./app");

const startServer = () => {
	try {
		const PORT = 3001;
		app.listen(PORT, () => console.log("Listening on port:", PORT));
	} catch (error) {
		console.error("Error starting server...", error);
	}
};

startServer();
