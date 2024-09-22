import { useState } from "react";
import useBlog from "../../hooks/useBlog";
import "./BlogForm.css";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const { newBlogMutation, noteFormRef } = useBlog();

  const handleSubmit = e => {
    e.preventDefault();

    const newBlog = { title, author, url };
    newBlogMutation.mutate(newBlog);
    noteFormRef.current.toggleVisibility();

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
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
          required
          data-testid="title"
        />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          placeholder="Author"
          required
          data-testid="author"
        />
      </div>
      <div>
        <label htmlFor="url">URL:</label>
        <input
          type="text"
          id="url"
          value={url}
          placeholder="URL"
          onChange={e => setUrl(e.target.value)}
          data-testid="url"
        />
      </div>
      <button type="submit">Add Blog</button>
    </form>
  );
};

export default BlogForm;
