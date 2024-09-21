import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Blog from "./components/blog/Blog";
import Login from "./components/login/Login";
import Notification from "./components/Notification";
import useAuth from "./hooks/useAuth";
import useBlog from "./hooks/useBlog";
import BlogForm from "./components/blogForm/BlogForm";
import eventEmitter from "./utils/utils";
import Togglable from "./components/Togglable";
import { fetchAllBlogs } from "./requests";
import { useNotificationValue } from "./reducers/NotificationContext";

const App = () => {
  const { user, login, logout } = useAuth();
  const { noteFormRef, update, remove } = useBlog();
  const notification = useNotificationValue();

  const {
    isPending,
    isError,
    error,
    data: fetchedBlogs
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchAllBlogs,
    retry: 1,
    refetchOnWindowFocus: false
  });

  if (isPending) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      {notification && <Notification message={notification} />}
      <h2>Blogs</h2>
      <div>
        {user ? (
          <div>
            <div>
              <p>
                {user?.name} Logged in <button onClick={logout}>Logout</button>
              </p>
            </div>
            <h3>Create new blog</h3>
            <Togglable buttonLabel="New Blog" ref={noteFormRef}>
              <BlogForm noteFormRef={noteFormRef} />
            </Togglable>

            <hr />
            <div className="blog-container">
              {fetchedBlogs
                .sort((a, b) => b.likes - a.likes)
                .map(blog => (
                  <Blog
                    key={blog.id}
                    blog={blog}
                    onUpdateBlog={update}
                    onDeleteBlog={remove}
                    currentUser={user}
                  />
                ))}
            </div>
          </div>
        ) : (
          <Login onLogin={login} />
        )}
      </div>
    </div>
  );
};

export default App;
