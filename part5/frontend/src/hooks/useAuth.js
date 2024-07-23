import { useState, useEffect } from "react";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { showMessage } from "../utils/utils";


const useAuth = () => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      showMessage("User already logged in", setErrorMessage);
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const login = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      setUser(user);
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      showMessage("Logged in successfully", setErrorMessage);
    } catch (err) {
      console.error("Login error:", err.message);
      showMessage("Invalid credentials", setErrorMessage);
    }
  };

  const logout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
    showMessage("Logged out successfully", setErrorMessage);
  };

  return {
    user,
    errorMessage,
    login,
    logout,
  };
}

export default useAuth;