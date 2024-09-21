import "./Blog.css";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotificationDispatch } from "../../reducers/NotificationContext";
import { removeBlog, updateBlogInDb } from "../../requests";

const Blog = props => {
  const [blog, setBlog] = useState(props.blog);
  const [fullBlogVisible, setFullBlogVisible] = useState(false);
  const { onDeleteBlog, currentUser } = props;

  const notificationDispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  const updateBlogMutation = useMutation({
    mutationFn: updateBlogInDb,
    onSuccess: updatedBlogData => {
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
        <div className="blog-title-container">
          <h3 className="blog-title">{blog.title}</h3>
          <p className="blog-author">by {blog.author}</p>
        </div>
        <button
          className={`${fullBlogVisible ? "blog-hide-button" : "blog-view-button"}`}
          onClick={toggleVisibility}
        >
          {fullBlogVisible ? "Hide" : "View"}
        </button>
      </div>
      {fullBlogVisible && (
        <div className="blog-full">
          <p>
            <a href={blog.url}>Click here to see full blog</a>
          </p>
          <p>
            {blog.likes} likes{" "}
            <button onClick={handleLikes} className="like-button">
              Like
            </button>
          </p>
          <p>
            Added by <b>{blog?.user.username}</b>
          </p>
          {currentUser?.username === blog?.user.username && (
            <button onClick={handleRemoveBlog} className="remove-button">
              Remove
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
