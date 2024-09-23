import { Routes, Route } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";

import Login from "./components/login/Login";
import Notification from "./components/Notification";
import UserInfo from "./components/UserInfo";
import UsersList from "./components/users/UsersList";
import UserDetail from "./components/users/UserDetail";
import BlogList from "./components/BlogList";
import BlogDetail from "./components/BlogDetail";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Box>
      <Navbar />
      <Container>
        <Notification />
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: "bold", fontSize: "2.5rem" }}
        >
          Blogs
        </Typography>

        <UserInfo />
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/:id" element={<UserDetail />} />
        </Routes>
      </Container>
    </Box>
  );
};

export default App;
