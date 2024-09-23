import {
  Button,
  Typography,
  Paper,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import useBlog from "../hooks/useBlog";
import { useUserValue } from "../reducers/UserContext";
import { fetchBlogById } from "../requests";

const BlogDetail = () => {
  const [comment, setComment] = useState("");

  const { id: blogId } = useParams();
  const navigate = useNavigate();
  const { updateBlogMutation, deleteBlogMuatation, commentBlogMutation } = useBlog();
  const currentUser = useUserValue();

  const queryClient = useQueryClient();
  const blogs = queryClient.getQueryData(["blogs"]);
  const cachedBlog = blogs?.find(blog => blog.id === blogId);

  const {
    data: blog,
    isError: blogError,
    isLoading: blogLoading
  } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: () => fetchBlogById(blogId),
    initialData: cachedBlog,
    enabled: !cachedBlog
  });

  const handleAddComment = async e => {
    e.preventDefault();
    commentBlogMutation.mutate({
      id: blog.id,
      updatedBlog: { comment }
    });
    setComment("");
  };

  if (blogLoading) {
    return <>Loading...</>;
  }

  if (blogError || !blog) {
    return <>Blog not found</>;
  }

  return (
    <Paper elevation={3} style={{ padding: "16px", margin: "16px" }}>
      <Typography variant="h4">{blog.title}</Typography>
      <Typography variant="subtitle1">
        <strong>Author:</strong> {blog.author}
      </Typography>

      <Typography variant="subtitle1">
        <strong>Likes:</strong> {blog.likes}{" "}
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            updateBlogMutation.mutate({
              id: blog.id,
              updatedBlog: { likes: blog.likes + 1 }
            })
          }
        >
          👍
        </Button>
      </Typography>

      <Typography variant="body1" paragraph>
        {blog.content}
      </Typography>

      <Typography variant="body1">
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          Read full blog
        </a>
      </Typography>

      <div>
        {currentUser?.username === blog.user.username && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`);
              if (confirm) {
                deleteBlogMuatation.mutate(blog.id);
                navigate("/");
              }
            }}
          >
            🗑️ Remove
          </Button>
        )}
      </div>

      <Divider style={{ margin: "16px 0" }} />

      <div>
        <Typography variant="h6">Comments</Typography>
        <Box
          sx={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "8px",
            backgroundColor: "#f9f9f9"
          }}
        >
          {blog.comments && blog.comments.length > 0 ? (
            <List>
              {blog.comments.map((comment, index) => (
                <ListItem key={index}>
                  <ListItemText primary={comment} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No comments yet</Typography>
          )}
        </Box>

        <form onSubmit={handleAddComment} style={{ marginTop: "16px" }}>
          <TextField
            variant="outlined"
            fullWidth
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Add a comment"
            required
            style={{ marginBottom: "16px" }}
          />
          <Button type="submit" variant="contained" color="primary">
            Add Comment
          </Button>
        </form>
      </div>
    </Paper>
  );
};
export default BlogDetail;
