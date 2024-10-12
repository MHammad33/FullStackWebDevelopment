const { GraphQLError } = require("graphql");
const { PubSub } = require("graphql-subscriptions");
const jwt = require("jsonwebtoken");
const Author = require("../models/Author.model");
const Book = require("../models/Book.model");
const User = require("../models/User.model");

const JWT_SECRET_KEY = "secret";

const pubsub = new PubSub();

const resolvers = {
	Query: {
		me: (root, args, context) => {
			return context.currentUser;
		},
		allAuthors: async () => {
			const authors = await Author.find({});
			return authors;
		},
		allBooks: async (root, args) => {
			const query = {};
			if (args.author) {
				query["author.name"] = args.author;
			}

			if (args.genre) {
				query.genres = { $in: [args.genre] };
			}

			const books = await Book.find(query).populate("author");
			return books;
		},
		findAuthor: async (root, args) => {
			return await Author.findOne({ name: args.name });
		},
		findBook: async (root, args) => {
			return await Book.findOne({ title: args.title }).populate("author");
		},
		bookCount: async () => {
			return await Book.countDocuments();
		},
		authorCount: async () => {
			return await Author.countDocuments();
		},
	},
	Mutation: {
		addBook: async (root, args, context) => {
			try {
				const currentUser = context.currentUser;
				if (!currentUser) {
					throw new GraphQLError("Not authenticated");
				}

				let author = await Author.findOne({ name: args.author });

				if (!author) {
					author = new Author({ name: args.author });
					await author.save();
				}

				const newBook = new Book({
					title: args.title,
					published: args.published,
					author: author._id,
					genres: args.genres,
				});

				await newBook.save();

				const populatedBook = await newBook.populate("author");
				pubsub.publish("BOOK_ADDED", { bookAdded: populatedBook });

				return newBook.populate("author");
			} catch (error) {
				if (error.name === "ValidationError") {
					throw new GraphQLError(`Validation Error: ${error.message}`);
				}
				throw new GraphQLError(`Error adding book: ${error.message}`);
			}
		},
		editAuthor: async (root, args, context) => {
			try {
				const currentUser = context.currentUser;
				if (!currentUser) {
					throw new GraphQLError("Not authenticated");
				}

				const author = await Author.findOne({ name: args.name });

				if (!author) {
					throw new GraphQLError(`Author not found: ${args.name}`);
				}

				author.born = args.setBornTo;

				await author.save();
				return author;
			} catch (error) {
				if (error.name === "ValidationError") {
					throw new GraphQLError(`Validation Error: ${error.message}`);
				}
				throw new GraphQLError(`Error editing author: ${error.message}`);
			}
		},
		createUser: async (root, args) => {
			const existingUser = await User.findOne({ username: args.username });
			if (existingUser) {
				throw new GraphQLError("Username already exists");
			}

			const user = new User({
				username: args.username,
				favoriteGenre: args.favoriteGenre,
			});
			await user.save();

			return user;
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username });

			const password = "1122";
			if (!user || args.password !== "1122") {
				throw new GraphQLError("wrong credentials", {
					extensions: {
						code: "BAD_USER_INPUT",
					},
				});
			}
			const userForToken = {
				username: user.username,
				id: user._id,
			};

			return {
				value: jwt.sign(userForToken, JWT_SECRET_KEY, { expiresIn: "1h" }),
			};
		},
	},
	Author: {
		bookCount: async (root) => {
			const count = await Book.countDocuments({ author: root._id });
			return count;
		},
	},
	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
		},
	},
};

module.exports = resolvers;
