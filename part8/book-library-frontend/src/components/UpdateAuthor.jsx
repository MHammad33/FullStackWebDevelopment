import { useState } from "react";

const UpdateAuthor = () => {
	const [author, setAuthor] = useState("");
	const [born, setBorn] = useState(2024);

	const handleSubmit = (event) => {
		event.preventDefault();
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
						onChange={({ target }) => setBorn(target.value)}
					/>
				</div>
				<button type="submit">update author</button>
			</form>
		</div>
	);
};
export default UpdateAuthor;
