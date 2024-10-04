const { v1: uuid } = require("uuid");
let authors = require("../data/authors");
let books = require("../data/books");

const bookCounts = books.reduce((booksCountObj, book) => {
	booksCountObj[book.author] = (booksCountObj[book.author] || 0) + 1;
	return booksCountObj;
}, {});

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
		addBook: (root, args) => {
			const book = { ...args, id: uuid() };

			let existingAuthor = authors.find(
				(author) => author.name === args.author
			);

			if (!existingAuthor) {
				existingAuthor = { name: args.author, id: uuid(), born: null };
				authors = authors.concat(existingAuthor);
			}

			const newBook = {
				...args,
				author: existingAuthor.name,
				id: uuid(),
			};

			books = books.concat(newBook);
			return newBook;
		},
	},
	Author: {
		bookCount: (root) => bookCounts[root.name] || 0,
	},
};

module.exports = resolvers;
