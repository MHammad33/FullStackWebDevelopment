import PropTypes from "prop-types";
import { useNotificationValue } from "../reducers/NotificationContext";

const Notification = ({ type = "" }) => {
  const notificationMessage = useNotificationValue();

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "green";
      case "error":
        return "red";
      case "warning":
        return "orange";
      default:
        return "gray";
    }
  };

  const notificationStyles = {
    position: "fixed",
    top: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: getBackgroundColor(),
    color: "white",
    border: "1px solid darkgrey",
    borderRadius: "5px",
    padding: "10px",
    display: notificationMessage ? "block" : "none",
    width: "80%",
    maxWidth: "300px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "opacity 0.5s ease-in-out",
    opacity: notificationMessage ? 1 : 0,
    zIndex: 99
  };
  return (
    <>
      <div style={notificationStyles}>{notificationMessage}</div>
    </>
  );
};

export default Notification;
