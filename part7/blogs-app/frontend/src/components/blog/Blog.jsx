import "./Blog.css";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotificationDispatch } from "../../reducers/NotificationContext";
import { removeBlog, updateBlogInDb } from "../../requests";
import { useUserValue } from "../../reducers/UserContext";
import { Link } from "react-router-dom";

import { Card, CardContent, CardActions, Typography, Button } from "@mui/material";

const Blog = props => {
  const [blog, setBlog] = useState(props.blog);
  const [fullBlogVisible, setFullBlogVisible] = useState(false);
  const currentUser = useUserValue();

  const notificationDispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  const updateBlogMutation = useMutation({
    mutationFn: updateBlogInDb,
    onSuccess: updatedBlogData => {
      console.log("updatedBlogData", updatedBlogData);
      queryClient.setQueryData(["blogs"], prevBlogs => {
        return prevBlogs.map(blog => (blog.id === updatedBlogData.id ? updatedBlogData : blog));
      });
      notificationDispatch({ type: "LIKE_BLOG", payload: updatedBlogData.title });
    },
    onError: error => {
      console.log("error", error);
    }
  });

  const deleteBlogMuatation = useMutation({
    mutationFn: removeBlog,
    onSuccess: deletedBlogId => {
      queryClient.setQueryData(["blogs"], prevBlogs => {
        return prevBlogs.filter(blog => blog.id !== deletedBlogId);
      });
      notificationDispatch({ type: "DELETE_BLOG", payload: "Blog" });
    },
    onError: error => {
      console.log("error", error);
    }
  });

  useEffect(() => {
    setBlog(props.blog);
  }, [props.blog]);

  const handleLikes = () => {
    updateBlogMutation.mutate({
      id: blog.id,
      updatedBlog: {
        likes: blog.likes + 1
      }
    });
  };

  const toggleVisibility = () => {
    setFullBlogVisible(!fullBlogVisible);
  };

  const handleRemoveBlog = () => {
    const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`);
    if (confirm) {
      deleteBlogMuatation.mutate(blog.id);
    }
  };

  return (
    <Card variant="outlined" style={{ margin: "16px" }}>
      <Link to={`/blogs/${blog.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <CardContent>
          <Typography variant="h5" component="h3" className="blog-title">
            {blog.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" className="likes-count">
            {blog.likes} likes
          </Typography>
          <Typography variant="body2" color="primary" className="read-more">
            Read More
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

export default Blog;
