import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";

const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Main />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default AllRoutes;
