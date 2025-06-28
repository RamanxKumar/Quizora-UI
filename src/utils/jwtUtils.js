// src/utils/jwtUtils.js
import jwt_decode from "jwt-decode";

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getUserRole = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwt_decode(token);
    return decoded.role;
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};

export const isLoggedIn = () => {
  const token = getToken();
  return !!token;
};
