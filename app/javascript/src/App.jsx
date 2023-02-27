import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/Authentication/LoginForm";

import { setAuthHeaders, registerIntercepts } from "./apis/axios";
import DashboardAuthentication from "./components/Authentication/DashboardAuthentication";
import Notification from "./components/Common/Notification";
import CircularProgress from "@mui/material/CircularProgress";
import { Container } from "@mui/material";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [notificationStatus, setNotificationStatus] = useState({
    isOpen: false,
    severity: "seuccess",
    message: "",
  });
  const [authenticationOption, setAuthenticationOption] = useState("login");

  const user = localStorage.getItem("user");

  useEffect(() => {
    setAuthHeaders(setLoading);
    registerIntercepts(setNotificationStatus);
  }, []);

  if (loading) {
    return (
      <Container maxWidth={false}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Router>
      <Notification
        notificationStatus={notificationStatus}
        setNotificationStatus={setNotificationStatus}
      />
      <Routes>
        <Route
          path="/login"
          element={
            <LoginForm
              user={user}
              authenticationOption={authenticationOption}
              setAuthenticationOption={setAuthenticationOption}
            />
          }
        />
        <Route path="/" element={<DashboardAuthentication user={user} />} />
      </Routes>
    </Router>
  );
};

export default App;
