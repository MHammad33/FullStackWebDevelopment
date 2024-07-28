import { useState } from "react";
import "./BlogForm.css";
import PropTypes from "prop-types";

const BlogForm = ({ onAddBlog }) => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		onAddBlog({ title, author, url });

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
					placeholder="Title"
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
					placeholder="Author"
					required
				/>
			</div>
			<div>
				<label htmlFor="url">URL:</label>
				<input
					type="text"
					id="url"
					value={url}
					placeholder="URL"
					onChange={(e) => setUrl(e.target.value)}
				/>
			</div>
			<button type="submit">Add Blog</button>
		</form>
	);
};

BlogForm.propTypes = {
	onAddBlog: PropTypes.func.isRequired,
};

export default BlogForm;
