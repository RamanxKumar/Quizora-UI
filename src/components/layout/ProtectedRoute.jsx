import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Agar token nahi mila to login pe redirect
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
