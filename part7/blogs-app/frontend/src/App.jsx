import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import Login from "./components/login/Login";
import Notification from "./components/Notification";
import useAuth from "./hooks/useAuth";
import UserInfo from "./components/UserInfo";
import UsersList from "./components/users/UsersList";
import UserDetail from "./components/users/UserDetail";
import BlogList from "./components/BlogList";

const App = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Notification />
      <h2>Blogs</h2>
      <UserInfo />

      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" element={<UserDetail />} />
      </Routes>
    </div>
  );
};

export default App;
