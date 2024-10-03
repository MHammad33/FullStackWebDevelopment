const typeDefs = `
	type Author {
		name: String!
		id: ID!
		born: Int
		bookCount: Int
	}

	 type Book {
    title: String!
    published: Int!
    author: String!
    genres: [String!]!
    id: ID!
  }

	type Query {
    allAuthors: [Author!]!
    allBooks: [Book!]!
    findAuthor(name: String!): Author
    findBook(title: String!): Book
		bookCount: Int!
		authorCount: Int!
  }
`;

module.exports = typeDefs;
