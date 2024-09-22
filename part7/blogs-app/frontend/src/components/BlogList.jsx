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
    <>
      <Togglable buttonLabel="New Blog" ref={noteFormRef}>
        <BlogForm noteFormRef={noteFormRef} />
      </Togglable>

      <div className="blog-container">
        {blogs
          ?.sort((a, b) => b.likes - a.likes)
          .map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
      </div>
    </>
  );
};

export default BlogList;
