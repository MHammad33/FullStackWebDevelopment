const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
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
		}).then(({ url }) => {
			console.log(`Server ready at ${url}`);
		});
	} catch (error) {
		console.error("Error starting server...", error);
	}
};

startServer();
