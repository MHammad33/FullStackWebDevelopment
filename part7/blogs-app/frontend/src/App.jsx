import { Routes, Route } from "react-router-dom";

import Login from "./components/login/Login";
import Notification from "./components/Notification";
import UserInfo from "./components/UserInfo";
import UsersList from "./components/users/UsersList";
import UserDetail from "./components/users/UserDetail";
import BlogList from "./components/BlogList";

const App = () => {
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
