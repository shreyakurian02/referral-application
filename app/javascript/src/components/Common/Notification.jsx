import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Notification = ({ notificationStatus, setNotificationStatus }) => {
  const { isOpen, severity, message } = notificationStatus;

  const onClose = () =>
    setNotificationStatus({ ...notificationStatus, isOpen: false });

  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
