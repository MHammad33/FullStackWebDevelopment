import { useState, useEffect, useMemo } from "react";
import { useQuery, useApolloClient } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import BooksByFavoriteGenre from "./components/BooksByFavoriteGenre";

const App = () => {
	const [page, setPage] = useState("authors");
	const loggedIn = useMemo(
		() => !!localStorage.getItem("booksLibrary-user-token"),
		[]
	);

	const client = useApolloClient();

	const handleLogout = () => {
		localStorage.clear();
		setPage("login");
		client.resetStore();
	};

	return (
		<div>
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

			<Authors show={page === "authors"} />

			<Books show={page === "books"} />

			<NewBook show={page === "add"} />

			<Login show={page === "login"} />

			<BooksByFavoriteGenre show={page === "favoriteGenre"} />
		</div>
	);
};

export default App;
