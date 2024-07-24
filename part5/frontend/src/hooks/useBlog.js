import { useEffect, useState } from "react";
import blogService from "../services/blogs";
import eventEmitter from "../utils/utils";

const useBlog = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const fetchedBlogs = await blogService.getAll();
      setBlogs(fetchedBlogs);
      eventEmitter.emit("showMessage", "Fetched blogs successful");
    } catch (error) {
      console.error("Error fetching blogs:", error.message);
      eventEmitter.emit("showMessage", "Error fetching blogs");
    }
  };

  const addBlog = async (newBlog) => {
    try {
      const savedBlog = await blogService.create(newBlog);
      setBlogs((prevBlogs) => prevBlogs.concat(savedBlog));
      eventEmitter.emit("showMessage", "Blog added successfully");
    } catch (error) {
      console.error('Add blog error:', error.message);
      eventEmitter.emit("showMessage", "Error adding blog");
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  return {
    blogs,
    addBlog,
    fetchBlogs,
  };

};

export default useBlog;