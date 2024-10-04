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
    allBooks(author: String, genre: String): [Book!]!
    findAuthor(name: String!): Author
    findBook(title: String!): Book
		bookCount: Int!
		authorCount: Int!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
  }
`;

module.exports = typeDefs;
