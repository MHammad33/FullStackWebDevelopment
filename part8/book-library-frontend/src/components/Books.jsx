import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS_BY_GENRE } from "../queries";

const Books = (props) => {
	const [selectedGenre, setSelectedGenre] = useState("All");
	const result = useQuery(GET_BOOKS_BY_GENRE, {
		variables: { genre: selectedGenre === "All" ? "" : selectedGenre },
		skip: !props.show,
	});

	if (!props.show) {
		return null;
	}

	if (result.loading) {
		return <div>loading...</div>;
	}

	const books = result.data?.allBooks;

	const uniqueGenres = new Set();
	books?.forEach((book) =>
		book.genres.forEach((genre) => uniqueGenres.add(genre))
	);

	return (
		<div>
			<h2>books</h2>

			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{books?.map((a) => (
						<tr key={a.title}>
							<td>{a.title}</td>
							<td>{a.author.name || "unknown"}</td>
							<td>{a.published}</td>
						</tr>
					))}
				</tbody>
			</table>

			<div>
				<h3>Genres: {selectedGenre}</h3>
				{[...uniqueGenres].map((genre) => (
					<button key={genre} onClick={() => setSelectedGenre(genre)}>
						{genre}
					</button>
				))}
				<button onClick={() => setSelectedGenre("All")}>All</button>
			</div>
		</div>
	);
};

export default Books;
