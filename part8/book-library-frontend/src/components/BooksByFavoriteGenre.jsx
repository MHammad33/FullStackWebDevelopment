import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const BooksByFavoriteGenre = (props) => {
	const result = useQuery(ALL_BOOKS);
	const favoriteGenre = localStorage.getItem("userFavoriteGenre") || "";

	if (!props.show) {
		return null;
	}

	if (result.loading) {
		return <div>loading...</div>;
	}

	const books = result.data?.allBooks;

	const filteredBooks = books?.filter((book) =>
		book.genres.includes(favoriteGenre)
	);

	return (
		<div>
			<h2>Books in Your Favorite Genre: {favoriteGenre}</h2>

			<table>
				<tbody>
					<tr>
						<th></th>
						<th>Author</th>
						<th>Published</th>
					</tr>
					{filteredBooks.map((a) => (
						<tr key={a.title}>
							<td>{a.title}</td>
							<td>{a.author.name || "unknown"}</td>
							<td>{a.published}</td>
						</tr>
					))}
				</tbody>
			</table>

			{filteredBooks.length === 0 && <div>No books found in this genre.</div>}
		</div>
	);
};
export default BooksByFavoriteGenre;
