import { Container, Typography, Grid, Paper, Box } from "@mui/material";
import { Add } from "@mui/icons-material";

import BlogForm from "./blogForm/BlogForm";
import Blog from "./blog/Blog";
import Togglable from "./Togglable";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNotificationDispatch } from "../reducers/NotificationContext";
import useAuth from "../hooks/useAuth";
import useBlog from "../hooks/useBlog";
import { fetchAllBlogs } from "../requests";
import { useNavigate } from "react-router-dom";

const BlogList = () => {
  const navigate = useNavigate();
  const notificationDispatch = useNotificationDispatch();
  const { logout } = useAuth();
  const { noteFormRef } = useBlog();

  const {
    isPending: blogsPending,
    isError: blogsError,
    error,
    data: blogs
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchAllBlogs,
    retry: 1,
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    if (blogsError && error?.response?.data?.error === "Jwt Token Expired") {
      notificationDispatch({ type: "ERROR", payload: "Login Session Expired. Please Login Again" });
      logout();
      navigate("/login");
    }
  }, [blogsError, error, notificationDispatch]);

  if (blogsPending) return <h3>Loading...</h3>;

  if (blogsError) {
    const errorMessage = error?.response?.data?.error;
    if (errorMessage === "Jwt Token Expired" || error.message === "User is not logged in.") {
      navigate("/login");
      logout();
    }
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center">
        Blog List
      </Typography>

      <Box mb={2}>
        <Togglable
          buttonLabel={
            <Box display="flex" alignItems="center">
              <Add /> New Blog
            </Box>
          }
          ref={noteFormRef}
        >
          <BlogForm />
        </Togglable>
      </Box>

      <Grid container spacing={4}>
        {blogs
          ?.sort((a, b) => b.likes - a.likes)
          .map(blog => (
            <Grid item xs={12} sm={6} md={4} key={blog.id}>
              <Paper
                elevation={3}
                style={{ padding: "16px", borderRadius: "8px", transition: "0.3s" }}
              >
                <Blog blog={blog} />
              </Paper>
            </Grid>
          ))}
      </Grid>

      {blogs.length === 0 && (
        <Typography
          variant="body1"
          color="textSecondary"
          style={{ textAlign: "center", marginTop: "20px" }}
        >
          No blogs available. Start writing your first blog!
        </Typography>
      )}
    </Container>
  );
};

export default BlogList;
