import { useState } from "react";
import "./BlogForm.css";

const BlogForm = ({ onAddBlog, closeForm }) => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		onAddBlog({ title, author, url });
		closeForm();

		// Clear form
		setTitle("");
		setAuthor("");
		setUrl("");
	};

	return (
		<form onSubmit={handleSubmit} className="blog-form">
			<div>
				<label htmlFor="title">Title:</label>
				<input
					type="text"
					id="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
			</div>
			<div>
				<label htmlFor="author">Author:</label>
				<input
					type="text"
					id="author"
					value={author}
					onChange={(e) => setAuthor(e.target.value)}
					required
				/>
			</div>
			<div>
				<label htmlFor="url">URL:</label>
				<input
					type="text"
					id="url"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
				/>
			</div>
			<button type="submit">Add Blog</button>
		</form>
	);
};
export default BlogForm;
