const authors = require("../data/authors");
const books = require("../data/books");

const resolvers = {
	Query: {
		allAuthors: () => authors,
		allBooks: () => books,
		findAuthor: (root, args) =>
			authors.find((author) => author.name === args.name),
		findBook: (root, args) => books.find((book) => book.title === args.title),
		bookCount: () => books.length,
		authorCount: () => authors.length,
	},
	Author: {
		bookCount: (root) =>
			books.filter((book) => book.author === root.name).length,
	},
};

module.exports = resolvers;
