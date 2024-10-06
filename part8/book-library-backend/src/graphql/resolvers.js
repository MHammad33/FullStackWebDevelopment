const Author = require("../models/Author.model");
const Book = require("../models/Book.model");

const resolvers = {
	Query: {
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
		},

		editAuthor: async (root, args) => {
			const author = await Author.findOne({ name: args.name });

			if (!author) {
				return null;
			}

			author.born = args.setBornTo;
			await author.save();
			return author;
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
