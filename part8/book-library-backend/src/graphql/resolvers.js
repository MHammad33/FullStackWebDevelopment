const { GraphQLError } = require("graphql");
const Author = require("../models/Author.model");
const Book = require("../models/Book.model");
const User = require("../models/User.model");

const JWT_SECRET_KEY = "secret";

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
			const books = await Book.find({}).populate("author");

			let filteredBooks = books;
			if (args.author)
				filteredBooks = filteredBooks.filter(
					(book) => book.author.name === args.author
				);

			if (args.genre) filteredBooks.genres = { $in: [args.genre] };

			return filteredBooks;
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
		addBook: async (root, args) => {
			try {
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
				return newBook.populate("author");
			} catch (error) {
				if (error.name === "ValidationError") {
					throw new GraphQLError(`Validation Error: ${error.message}`);
				}
				throw new GraphQLError(`Error adding book: ${error.message}`);
			}
		},
		editAuthor: async (root, args) => {
			try {
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
	},
	Author: {
		bookCount: async (root) => {
			const count = await Book.countDocuments({ author: root._id });
			return count;
		},
	},
};

module.exports = resolvers;
