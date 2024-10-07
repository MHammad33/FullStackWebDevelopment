import { useState, useEffect } from "react";
import { useQuery, useApolloClient } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";

const App = () => {
	const [page, setPage] = useState("authors");
	const [loggedIn, setLoggedIn] = useState(false);
	const client = useApolloClient();

	useEffect(() => {
		const token = localStorage.getItem("booksLibrary-user-token");
		if (token) {
			setLoggedIn(true);
		}
	}, []);

	const handleLogout = () => {
		localStorage.clear();
		setLoggedIn(false);
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
		</div>
	);
};

export default App;
