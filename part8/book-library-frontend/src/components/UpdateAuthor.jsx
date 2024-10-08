import { useMutation } from "@apollo/client";
import Select from "react-select";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { UPDATE_AUTHOR } from "../queries";

const UpdateAuthor = React.memo(({ authors }) => {
	const [selectedAuthor, setSelectedAuthor] = useState("");
	const [born, setBorn] = useState(0);
	const [updateAuthor, { data: authorData }] = useMutation(UPDATE_AUTHOR);

	useEffect(() => {
		if (!authorData) {
			return;
		}

		if (authorData?.editAuthor === null) {
			console.log("Author not found");
		} else if (authorData?.editAuthor) {
			console.log("Author updated:", authorData?.editAuthor);
		}
	}, [authorData]);

	const handleSubmit = useCallback(
		(event) => {
			event.preventDefault();

			if (selectedAuthor) {
				updateAuthor({
					variables: { name: selectedAuthor.value, setBornTo: Number(born) },
				});
				setSelectedAuthor(null);
				setBorn(0);
			}
		},
		[selectedAuthor, born, updateAuthor]
	);

	const authorOptions = useMemo(
		() =>
			authors?.map((author) => ({
				value: author.name,
				label: author.name,
			})),
		[authors]
	);

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
});
export default UpdateAuthor;
