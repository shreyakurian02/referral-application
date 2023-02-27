import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/Authentication/LoginForm";

import { setAuthHeaders } from "./apis/axios";
import DashboardAuthentication from "./components/Authentication/DashboardAuthentication";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [authenticationOption, setAuthenticationOption] = useState("login");

  const user = localStorage.getItem("user");

  useEffect(() => {
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Router>
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
