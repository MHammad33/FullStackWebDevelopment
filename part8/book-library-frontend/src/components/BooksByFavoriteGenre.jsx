import { useQuery } from "@apollo/client";
import { ALL_BOOKS, GET_CURRENT_USER } from "../queries";

const BooksByFavoriteGenre = (props) => {
	const { loading: booksLoading, data: booksData } = useQuery(ALL_BOOKS);
	const { loading: userLoading, data: userData } = useQuery(GET_CURRENT_USER);

	if (!props.show) {
		return null;
	}

	if (booksLoading || userLoading) {
		return <div>loading...</div>;
	}

	const books = booksData?.allBooks;
	const favoriteGenre = userData?.me?.favoriteGenre;

	const filteredBooks = favoriteGenre
		? books?.filter((book) => book.genres.includes(favoriteGenre))
		: [];

	return (
		<div>
			<h2>Books in Your Favorite Genre: {favoriteGenre || "None"}</h2>

			<table>
				<tbody>
					<tr>
						<th></th>
						<th>Author</th>
						<th>Published</th>
					</tr>
					{filteredBooks && filteredBooks.length > 0 ? (
						filteredBooks.map((a) => (
							<tr key={a.title}>
								<td>{a.title}</td>
								<td>{a.author.name || "unknown"}</td>
								<td>{a.published}</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="3">No books found in this genre.</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};
export default BooksByFavoriteGenre;
