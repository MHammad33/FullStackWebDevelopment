import loginService from "../services/login";
import { useNotificationDispatch } from "../reducers/NotificationContext";
import { useUserDispatch } from "../reducers/UserContext";

const useAuth = () => {
  const notificationDispatch = useNotificationDispatch();
  const userDispatch = useUserDispatch();

  const login = async credentials => {
    try {
      const user = await loginService.login(credentials);
      userDispatch({ type: "LOGIN", payload: user });
      notificationDispatch({ type: "LOGIN" });
      window.location.href = "/";
    } catch (err) {
      console.error("Login error:", err.message);
      notificationDispatch({ type: "ERROR", payload: err.message });
    }
  };

  const logout = () => {
    userDispatch({ type: "LOGOUT" });
  };

  return {
    login,
    logout
  };
};

export default useAuth;
