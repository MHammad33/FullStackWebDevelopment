import { useState, useEffect } from "react";
import blogService from "../services/blogs";
import loginService from "../services/login";


export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const showMessage = (message, duration = 3000) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, duration);
  };

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error.message);
      showMessage("Error fetching blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      showMessage("User already logged in");
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
      fetchBlogs();
    }
  }, []);

  const handleLogin = async (credentials) => {
    setLoading(true);
    try {
      const user = await loginService.login(credentials);
      setUser(user);
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      showMessage("Logged in successfully");
      fetchBlogs();
    } catch (err) {
      console.error("Login error:", err.message);
      showMessage("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
    showMessage("Logged out successfully");
  };

  return {
    user,
    blogs,
    loading,
    errorMessage,
    handleLogin,
    handleLogout,
  };
}