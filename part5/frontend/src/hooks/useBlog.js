import { useEffect, useRef, useState } from "react";
import blogService from "../services/blogs";
import eventEmitter from "../utils/utils";

const useBlog = () => {
  const [blogs, setBlogs] = useState([]);

  const noteFormRef = useRef();

  const fetchBlogs = async () => {
    try {
      const fetchedBlogs = await blogService.getAll();
      const sortedBlogs = fetchedBlogs.sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs);
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
      noteFormRef.current.toggleVisibility();
    } catch (error) {
      console.error('Add blog error:', error.message);
      eventEmitter.emit("showMessage", "Error adding blog");
    }
  }

  const update = async (id, updatedBlog) => {
    try {
      const updated = await blogService.update(id, updatedBlog);
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) => (blog.id === id ? updated : blog))
      );
      eventEmitter.emit("showMessage", "Blog updated successfully");
    } catch (error) {
      console.error('Update blog error:', error.message);
      eventEmitter.emit("showMessage", "Error updating blog");
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  return {
    blogs,
    addBlog,
    fetchBlogs,
    noteFormRef,
    update
  };

};

export default useBlog;