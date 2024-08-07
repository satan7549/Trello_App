import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

// A simpler PrivateRoute component
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");

    if (token) {
      console.log(token);
      // const user = parseJwt(token); // Implement parseJwt to decode the token and get user info
      // dispatch(loginSuccess({ token, user }));
      localStorage.setItem("token", token);
    }
  }, [location.search, dispatch]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
