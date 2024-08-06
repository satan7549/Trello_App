import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// A simpler PrivateRoute component
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
