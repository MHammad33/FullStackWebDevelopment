const { v1: uuid } = require("uuid");
const Author = require("../models/Author.model");
const Book = require("../models/Book.model");

let authors = require("../data/authors");
let books = require("../data/books");

const resolvers = {
	Query: {
		allAuthors: () => authors,
		allBooks: async (root, args) => {
			const books = await Book.find({}).populate("author");

			let filteredBooks = books;
			if (args.author)
				filteredBooks = filteredBooks.filter(
					(book) => book.author.name === args.author
				);

			if (args.genre)
				filteredBooks = filteredBooks.filter((book) =>
					book.genres.includes(args.genre)
				);

			return filteredBooks;
		},
		findAuthor: (root, args) =>
			authors.find((author) => author.name === args.name),
		findBook: (root, args) => books.find((book) => book.title === args.title),
		bookCount: () => books.length,
		authorCount: () => authors.length,
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
		bookCount: (root) =>
			books.filter((book) => book.author === root.name).length,
	},
};

module.exports = resolvers;
