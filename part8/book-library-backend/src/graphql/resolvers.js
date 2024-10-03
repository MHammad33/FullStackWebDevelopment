const authors = require("../data/authors");
const books = require("../data/books");

const bookCounts = books.reduce((booksCountObj, book) => {
	booksCountObj[book.author] = (booksCountObj[book.author] || 0) + 1;
	return booksCountObj;
}, {});

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
		bookCount: (root) => bookCounts[root.name] || 0,
	},
};

module.exports = resolvers;
