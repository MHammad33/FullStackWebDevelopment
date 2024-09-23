import { TextField, Button, Box } from "@mui/material";

import { useState } from "react";
import useBlog from "../../hooks/useBlog";

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
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          data-testid="title"
        />
        <TextField
          label="Author"
          variant="outlined"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          required
          data-testid="author"
        />
        <TextField
          label="URL"
          variant="outlined"
          value={url}
          onChange={e => setUrl(e.target.value)}
          data-testid="url"
        />
        <Button type="submit" variant="contained" color="primary">
          Add Blog
        </Button>
      </Box>
    </form>
  );
};

export default BlogForm;
