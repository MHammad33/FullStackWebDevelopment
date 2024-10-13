import { useState, useEffect, useMemo } from "react";
import { useQuery, useApolloClient, useSubscription } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import BooksByFavoriteGenre from "./components/BooksByFavoriteGenre";
import { GET_BOOKS_BY_GENRE, BOOK_ADDED, ALL_BOOKS } from "./queries";

export const updateBooksCache = (cache, query, addedBook) => {
	const uniqueByTitle = (books) => {
		let seenBooks = new Set();
		return books.filter((book) => {
			let bookTitle = book.title;
			return seenBooks.has(bookTitle) ? false : seenBooks.add(book);
		});
	};

	cache.updateQuery(query, ({ allBooks }) => {
		return {
			allBooks: uniqueByTitle(allBooks.concat(addedBook)),
		};
	});
};

const App = () => {
	const [page, setPage] = useState("authors");
	const loggedIn = useMemo(
		() => !!localStorage.getItem("booksLibrary-user-token"),
		[]
	);

	useSubscription(BOOK_ADDED, {
		onData: ({ data, client }) => {
			const addedBook = data.data.bookAdded;
			window.alert(`${addedBook.title} added`);
			updateBooksCache(
				client.cache,
				{ query: GET_BOOKS_BY_GENRE, variables: { genre: "" } },
				addedBook
			);
		},
	});

	const client = useApolloClient();

	const handleLogout = () => {
		localStorage.clear();
		setPage("login");
		client.resetStore();
	};

	const renderPage = () => {
		switch (page) {
			case "authors":
				return <Authors show />;
			case "books":
				return <Books show />;
			case "add":
				return loggedIn && <NewBook show />;
			case "login":
				return <Login show />;
			case "favoriteGenre":
				return loggedIn && <BooksByFavoriteGenre show />;
			default:
				return null;
		}
	};

	const navButtons = useMemo(
		() => (
			<div>
				<button onClick={() => setPage("authors")}>authors</button>
				<button onClick={() => setPage("books")}>books</button>
				{loggedIn ? (
					<>
						<button onClick={() => setPage("add")}>add book</button>
						<button onClick={() => setPage("favoriteGenre")}>
							favorite genre
						</button>
						<button onClick={handleLogout}>logout</button>
					</>
				) : (
					<button onClick={() => setPage("login")}>login</button>
				)}
			</div>
		),
		[loggedIn]
	);

	return (
		<div>
			{navButtons}
			{renderPage()}
		</div>
	);
};

export default App;
