const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const {
	ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const express = require("express");
const cors = require("cors");
const http = require("http");

const jwt = require("jsonwebtoken");
const User = require("./models/User.model");
const config = require("./utils/config");
const connectDb = require("./db/connectDb");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

// Db connection
connectDb(config.MONGODB_URI);

const startServer = async () => {
	const app = express();
	const httpServer = http.createServer(app);

	const server = new ApolloServer({
		schema: makeExecutableSchema({ typeDefs, resolvers }),
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	});

	await server.start();

	const PORT = 4000;

	app.use(
		"/",
		cors(),
		express.json(),
		expressMiddleware(server, {
			context: async ({ req }) => {
				const auth = req.authorization.headers || null;
				if (auth && auth.startsWith("Bearer ")) {
					const decodedToken = jwt.verify(auth.substring(7), "secret");
					const currentUser = await User.findById(decodedToken.id);
					return { currentUser };
				}
			},
		})
	);

	httpServer.listen(PORT, () => {
		console.log(`Server is now running on http://localhost:${PORT}`);
	});
};

startServer();
