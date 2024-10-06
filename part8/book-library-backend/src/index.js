const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const jwt = require("jsonwebtoken");
const User = require("./models/User.model");
const config = require("./utils/config");
const connectDb = require("./db/connectDb");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const startServer = async () => {
	const server = new ApolloServer({
		typeDefs,
		resolvers,
	});

	try {
		await connectDb(config.MONGODB_URI);
		startStandaloneServer(server, {
			listen: { port: 4000 },
			context: async ({ req, res }) => {
				const auth = req ? req.headers.authorization : null;
				if (auth && auth.startsWith("Bearer ")) {
					const decodedToken = jwt.verify(auth.substring(7), "secret");
					const currentUser = await User.findById(decodedToken.id);
					return { currentUser };
				}
			},
		}).then(({ url }) => {
			console.log(`Server ready at ${url}`);
		});
	} catch (error) {
		console.error("Error starting server...", error);
	}
};

startServer();
