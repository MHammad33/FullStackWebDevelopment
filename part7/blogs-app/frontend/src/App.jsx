import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Routes, Route, Link } from "react-router-dom";

import Login from "./components/login/Login";
import Notification from "./components/Notification";
import useAuth from "./hooks/useAuth";
import useBlog from "./hooks/useBlog";
import RenderContent from "./components/RenderContent";
import { fetchAllBlogs } from "./requests";
import { useNotificationDispatch, useNotificationValue } from "./reducers/NotificationContext";
import { useUserValue } from "./reducers/UserContext";
import UserInfo from "./components/UserInfo";

const App = () => {
  const { login, logout } = useAuth();
  const { noteFormRef, update, remove } = useBlog();
  const notification = useNotificationValue();
  const notificationDispatch = useNotificationDispatch();
  const user = useUserValue();

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

  useEffect(() => {
    if (isError && error?.response?.data?.error === "Jwt Token Expired") {
      notificationDispatch({ type: "ERROR", payload: "Login Session Expired. Please Login Again" });
    }
  }, [isError, error, notificationDispatch]);

  return (
    <div>
      {notification && <Notification message={notification} />}
      <h2>Blogs</h2>

      {user && <UserInfo user={user} onLogout={logout} />}

      <Routes>
        <Route
          path="/"
          element={
            <RenderContent
              isPending={isPending}
              isError={isError}
              error={error}
              fetchedBlogs={fetchedBlogs}
              user={user}
              update={update}
              remove={remove}
              noteFormRef={noteFormRef}
              login={login}
            />
          }
        />
        <Route path="/users" element={<>Users</>} />
      </Routes>
    </div>
  );
};

export default App;
