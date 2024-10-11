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

connectDb(config.MONGODB_URI)
	.then((response) => {
		console.log("Connection to Database");
	})
	.catch((error) => {
		console.log("Error connecting to database", error);
	});

const startServer = async () => {
	const app = express();
};

startServer();
