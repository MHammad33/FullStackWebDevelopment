const { v1: uuid } = require("uuid");
const Author = require("../models/Author.model");
const Book = require("../models/Book.model");

let authors = require("../data/authors");
let books = require("../data/books");

const resolvers = {
	Query: {
		allAuthors: () => authors,
		allBooks: (root, args) => {
			let filteredBooks = books;
			if (args.author)
				filteredBooks = filteredBooks.filter(
					(book) => book.author === args.author
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

		editAuthor: (root, args) => {
			const authorToUpdate = authors.find(
				(author) => author.name === args.name
			);

			if (!authorToUpdate) {
				return null;
			}

			const authorWithUpdatedData = { ...authorToUpdate, born: args.setBornTo };

			authors = authors.map((author) =>
				author.name === args.name ? authorWithUpdatedData : author
			);
			return authorWithUpdatedData;
		},
	},
	Author: {
		bookCount: (root) =>
			books.filter((book) => book.author === root.name).length,
	},
};

module.exports = resolvers;
