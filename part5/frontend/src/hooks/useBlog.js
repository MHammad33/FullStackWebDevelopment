import { useEffect, useState } from "react";
import blogService from "../services/blogs";
import { showMessage } from "../utils/utils";

const useBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchBlogs = async () => {
    try {
      setErrorMessage('Fetching blogs...');
      const fetchedBlogs = await blogService.getAll();

      setTimeout(() => setErrorMessage(null), 500);
      setBlogs(fetchedBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error.message);
      showMessage("Error fetching blogs", setErrorMessage);
    }
  };

  const addBlog = async (newBlog) => {
    try {
      const savedBlog = await blogService.create(newBlog);
      setBlogs((prevBlogs) => prevBlogs.concat(savedBlog));
      showMessage("Blog added successfully", setErrorMessage);
    } catch (error) {
      console.error('Add blog error:', error.message);
      showMessage('Error adding blog', setErrorMessage);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  return {
    blogs,
    errorMessage,
    addBlog,
    fetchBlogs,
  };

};

export default useBlog;