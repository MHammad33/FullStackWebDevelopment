import { Snackbar, Alert } from "@mui/material";
import PropTypes from "prop-types";
import { useNotificationValue } from "../reducers/NotificationContext";

const Notification = ({ type = "" }) => {
  const notificationMessage = useNotificationValue();

  return (
    <Snackbar
      open={!!notificationMessage}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{ zIndex: 9999 }} // Highest z-index for visibility
    >
      <Alert
        severity="info" // Default severity
        variant="filled"
        sx={{ borderRadius: "8px", boxShadow: 3 }}
      >
        {notificationMessage}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
