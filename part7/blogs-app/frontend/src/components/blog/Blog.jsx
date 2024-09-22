import "./Blog.css";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotificationDispatch } from "../../reducers/NotificationContext";
import { removeBlog, updateBlogInDb } from "../../requests";
import { useUserValue } from "../../reducers/UserContext";
import { Link } from "react-router-dom";

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
    <div className="blog-card">
      <div className="blog-header">
        <h3 className="blog-title">{blog.title}</h3>
        <Link to={`/blogs/${blog.id}`} className="view-details-button">
          View Details
        </Link>
      </div>
      <p className="likes-count">{blog.likes} likes</p>
      <button onClick={handleLikes} className="like-button">
        👍 Like
      </button>
    </div>
  );
};

export default Blog;
