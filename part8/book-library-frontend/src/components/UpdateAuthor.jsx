import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { UPDATE_AUTHOR } from "../queries";

const UpdateAuthor = () => {
	const [author, setAuthor] = useState("");
	const [born, setBorn] = useState(0);
	const [updateAuthor, result] = useMutation(UPDATE_AUTHOR, {});

	useEffect(() => {
		if (!result.data) {
			return;
		}

		if (result.data.editAuthor === null) {
			console.log("Author not found");
		} else {
			console.log("Author updated:", result.data.editAuthor);
		}
	}, [result.data]);

	const handleSubmit = (event) => {
		event.preventDefault();

		updateAuthor({ variables: { name: author, setBornTo: Number(born) } });
		setAuthor("");
		setBorn(0);
	};

	return (
		<div>
			<h2>Set birthyear</h2>
			<form onSubmit={handleSubmit}>
				<div>
					name
					<input
						value={author}
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					born
					<input
						value={born}
						type="number"
						min={1960}
						onChange={({ target }) => setBorn(target.value)}
					/>
				</div>
				<button type="submit">update author</button>
			</form>
		</div>
	);
};
export default UpdateAuthor;
