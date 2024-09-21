import { useEffect, useRef, useState } from "react";
import blogService from "../services/blogs";
import { useNotificationDispatch } from "../reducers/NotificationContext";
import eventEmitter from "../utils/utils";

const useBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const notificationDispatch = useNotificationDispatch();
  const noteFormRef = useRef();

  // const fetchBlogs = async () => {
  //   try {
  //     const fetchedBlogs = await blogService.getAll();
  //     const sortedBlogs = fetchedBlogs.sort((a, b) => b.likes - a.likes);
  //     setBlogs(sortedBlogs);
  //     notificationDispatch({ type: "FETCHED_ALL_BLOGS" });
  //   } catch (error) {
  //     console.error("Error fetching blogs:", error.message);
  //     eventEmitter.emit("showMessage", "Error fetching blogs");
  //     notificationDispatch({ type: "ERROR", payload: error.message });
  //   }
  // };

  const addBlog = async newBlog => {
    try {
      const savedBlog = await blogService.create(newBlog);
      setBlogs(prevBlogs => prevBlogs.concat(savedBlog));
      notificationDispatch({ type: "ADD_BLOG", payload: savedBlog.title });
      noteFormRef.current.toggleVisibility();
    } catch (error) {
      console.error("Add blog error:", error.message);
      notificationDispatch({ type: "ERROR", payload: error.message });
    }
  };

  const update = async (id, updatedBlog) => {
    try {
      const updated = await blogService.update(id, updatedBlog);
      setBlogs(prevBlogs => prevBlogs.map(blog => (blog.id === id ? updated : blog)));
      notificationDispatch({ type: "UPDATE_BLOG", payload: updated.title });
    } catch (error) {
      console.error("Update blog error:", error.message);
      notificationDispatch({ type: "ERROR", payload: error.message });
    }
  };

  const remove = async id => {
    try {
      await blogService.remove(id);
      setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== id));
      eventEmitter.emit("showMessage", "Blog removed successfully");
    } catch (error) {
      console.error("Remove blog error:", error.message);
      eventEmitter.emit("showMessage", "Error removing blog");
    }
  };

  useEffect(() => {
    // fetchBlogs();
  }, []);

  return {
    blogs,
    addBlog,
    // fetchBlogs,
    noteFormRef,
    update,
    remove
  };
};

export default useBlog;
