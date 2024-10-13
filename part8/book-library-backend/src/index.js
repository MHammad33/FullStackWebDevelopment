const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const {
	ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");

const express = require("express");
const cors = require("cors");
const http = require("http");

const jwt = require("jsonwebtoken");
const User = require("./models/User.model");
const config = require("./utils/config");
const connectDb = require("./db/connectDb");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { bookCountLoader } = require("./utils/bookCountLoader");

// Db connection
connectDb(config.MONGODB_URI);

const startServer = async () => {
	const app = express();
	const httpServer = http.createServer(app);

	const wsServer = new WebSocketServer({
		server: httpServer,
		path: "/",
	});

	const schema = makeExecutableSchema({ typeDefs, resolvers });
	const serverCleanup = useServer({ schema }, wsServer);

	const server = new ApolloServer({
		schema,
		plugins: [
			ApolloServerPluginDrainHttpServer({ httpServer }),
			{
				async serverWillStart() {
					return {
						async drainServer() {
							await serverCleanup.dispose();
						},
					};
				},
			},
		],
	});

	await server.start();

	const PORT = 4000;

	app.use(
		"/",
		cors(),
		express.json(),
		expressMiddleware(server, {
			context: async ({ req }) => {
				const auth = req.headers.authorization || null;
				if (auth && auth.startsWith("Bearer ")) {
					const decodedToken = jwt.verify(auth.substring(7), "secret");
					const currentUser = await User.findById(decodedToken.id);
					return { currentUser, bookCountLoader };
				}
			},
		})
	);

	httpServer.listen(PORT, () => {
		console.log(`Server is now running on http://localhost:${PORT}`);
	});
};

startServer();
