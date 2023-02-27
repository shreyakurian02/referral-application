import React from "react";
import Dashboard from "../Dashboard";
import { Navigate, useLocation } from "react-router-dom";

const DashboardAuthentication = ({ user }) => {
  const verifyAuthenticity = () => {
    const location = useLocation();
    if (!user) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Dashboard />;
  };

  return verifyAuthenticity();
};

export default DashboardAuthentication;
