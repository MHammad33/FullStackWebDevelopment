import { gql } from "@apollo/client";

const BOOK_DETAILS = gql`
	fragment BookDetails on Book {
		title
		author {
			name
		}
		published
		genres
	}
`;

const AUTHOR_DETAILS = gql`
	fragment AuthorDetails on Author {
		id
		name
		born
		bookCount
	}
`;

export const ALL_AUTHORS = gql`
	query {
		allAuthors {
			...AuthorDetails
		}
	}
	${AUTHOR_DETAILS}
`;

export const ALL_BOOKS = gql`
	query {
		allBooks {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`;

export const CREATE_BOOK = gql`
	mutation createBook(
		$title: String!
		$author: String!
		$published: Int!
		$genres: [String!]!
	) {
		addBook(
			title: $title
			author: $author
			published: $published
			genres: $genres
		) {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`;

export const UPDATE_AUTHOR = gql`
	mutation updateAuthor($name: String!, $setBornTo: Int!) {
		editAuthor(name: $name, setBornTo: $setBornTo) {
			...AuthorDetails
		}
	}
	${AUTHOR_DETAILS}
`;

export const LOGIN_USER = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
		}
	}
`;

export const GET_CURRENT_USER = gql`
	query {
		me {
			favoriteGenre
		}
	}
`;

export const GET_BOOKS_BY_GENRE = gql`
	query getBooksByGenre($genre: String!) {
		allBooks(genre: $genre) {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`;

export const BOOK_ADDED = gql`
	subscription {
		bookAdded {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`;
