import { useMutation } from "@apollo/client";
import Select from "react-select";
import { useState, useEffect } from "react";
import { UPDATE_AUTHOR } from "../queries";

const UpdateAuthor = ({ authors }) => {
	const [selectedAuthor, setSelectedAuthor] = useState("");
	const [born, setBorn] = useState(0);
	const [updateAuthor, result] = useMutation(UPDATE_AUTHOR);

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

		if (selectedAuthor) {
			updateAuthor({
				variables: { name: selectedAuthor.value, setBornTo: Number(born) },
			});
			setSelectedAuthor(null);
			setBorn(0);
		}
	};

	const authorOptions = authors?.map((author) => ({
		value: author.name,
		label: author.name,
	}));

	return (
		<div>
			<h2>Set birthyear</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Select Author</label>
					<Select
						value={selectedAuthor}
						onChange={setSelectedAuthor}
						options={authorOptions}
						placeholder="Select an author..."
						isClearable
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
