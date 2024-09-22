import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import Login from "./components/login/Login";
import Notification from "./components/Notification";
import useAuth from "./hooks/useAuth";
import useBlog from "./hooks/useBlog";
import RenderContent from "./components/RenderContent";
import { fetchAllBlogs } from "./requests";
import { useNotificationDispatch, useNotificationValue } from "./reducers/NotificationContext";
import { useUserValue } from "./reducers/UserContext";
import UserInfo from "./components/UserInfo";
import UsersList from "./components/users/UsersList";
import UserDetail from "./components/users/UserDetail";

const App = () => {
  const navigate = useNavigate();
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
      logout();
      navigate("/login");
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
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" element={<UserDetail />} />
      </Routes>
    </div>
  );
};

export default App;
