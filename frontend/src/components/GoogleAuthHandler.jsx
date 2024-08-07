import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/auth/reducer";

const GoogleAuthHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchGoogleAuth = () => {
      const urlParams = new URLSearchParams(location.search);
      const token = urlParams.get("token");
      const userBase64 = urlParams.get("user");

      if (token && userBase64) {
        const user = JSON.parse(atob(userBase64));
        dispatch(loginSuccess({ token, user }));
        // localStorage.setItem("token", token);
        // localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      } else {
        navigate("/login");
      }
    };

    fetchGoogleAuth();
  }, [location.search, dispatch, navigate]);

  return <div>Loading...</div>;
};

export default GoogleAuthHandler;
