import { useState, useEffect } from "react";
import blogService from "../services/blogs";
import loginService from "../services/login";
import eventEmitter from "../utils/utils";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      eventEmitter.emit("showMessage", "Logged in successfully");
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const login = async credentials => {
    try {
      const user = await loginService.login(credentials);
      setUser(user);
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      eventEmitter.emit("showMessage", "Logged in successfully");
    } catch (err) {
      console.error("Login error:", err.message);
      eventEmitter.emit("showMessage", "Invalid username or password");
    }
  };

  const logout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
    blogService.setToken(null);
    eventEmitter.emit("showMessage", "Logged out successfully");
  };

  return {
    user,
    login,
    logout
  };
};

export default useAuth;
