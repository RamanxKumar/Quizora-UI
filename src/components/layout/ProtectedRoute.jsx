// src/utils/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Component, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(atob(token.split('.')[1])) : null;

  if (!token || !user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  return <Component />;
};

export default PrivateRoute;
