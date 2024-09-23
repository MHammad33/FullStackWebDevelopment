import { Routes, Route } from "react-router-dom";

import Login from "./components/login/Login";
import Notification from "./components/Notification";
import UserInfo from "./components/UserInfo";
import UsersList from "./components/users/UsersList";
import UserDetail from "./components/users/UserDetail";
import BlogList from "./components/BlogList";
import BlogDetail from "./components/BlogDetail";
import Navbar from "./components/navbar/Navbar";

import Button from "@mui/material/Button";

const App = () => {
  return (
    <div>
      <Navbar />
      <Notification />
      <h2>Blogs</h2>
      <Button variant="contained">Hello world</Button>;
      <UserInfo />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" element={<UserDetail />} />
      </Routes>
    </div>
  );
};

export default App;
