import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useNotificationDispatch } from "../reducers/NotificationContext";
import { addBlogComment, createNewBlog, removeBlog, updateBlogInDb } from "../requests";

const useBlog = () => {
  const noteFormRef = useRef();
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const newBlogMutation = useMutation({
    mutationFn: createNewBlog,
    onSuccess: newBlog => {
      const previousBlogs = queryClient.getQueryData(["blogs"]);
      const updatedBlogs = [...previousBlogs, newBlog];
      queryClient.setQueryData(["blogs"], updatedBlogs);
      notificationDispatch({ type: "ADD_BLOG", payload: newBlog.title });
    }
  });

  const updateBlogMutation = useMutation({
    mutationFn: updateBlogInDb,
    onSuccess: updatedBlogData => {
      console.log("updatedBlogData", updatedBlogData);
      queryClient.setQueryData(["blogs"], prevBlogs => {
        return prevBlogs.map(blog => (blog.id === updatedBlogData.id ? updatedBlogData : blog));
      });
      queryClient.setQueryData(["blog", updatedBlogData.id], prevBlog => {
        return updatedBlogData;
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

  const commentBlogMutation = useMutation({
    mutationFn: addBlogComment,
    onSuccess: updatedBlogData => {
      queryClient.setQueryData(["blogs"], prevBlogs => {
        if (!prevBlogs) return [];
        return prevBlogs.map(blog => (blog.id === updatedBlogData.id ? updatedBlogData : blog));
      });
      queryClient.setQueryData(["blog", updatedBlogData.id], prevBlog => {
        return updatedBlogData;
      });

      notificationDispatch({ type: "ADD_COMMENT", payload: updatedBlogData.title });
    },
    onError: error => {
      console.log("error", error);
    }
  });

  return {
    noteFormRef,
    newBlogMutation,
    updateBlogMutation,
    deleteBlogMuatation,
    commentBlogMutation
  };
};

export default useBlog;
