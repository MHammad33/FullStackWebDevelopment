import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useNotificationDispatch } from "../reducers/NotificationContext";
import { createNewBlog } from "../requests";

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

  return {
    noteFormRef,
    newBlogMutation
  };
};

export default useBlog;
