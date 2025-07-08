import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Apply theme to body
    document.body.className = isDark ? "bg-dark text-light" : "bg-light text-dark";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    // Keep isLoggedIn in sync with localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location.pathname]); // Update login state on route change

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const getLinkClass = ({ isActive }) =>
    `nav-link px-3 py-2 rounded-pill fw-semibold ${
      isDark ? "text-light" : "text-dark"
    } ${isActive ? (isDark ? "bg-light text-dark" : "bg-dark text-white") : ""}`;

  return (
    <nav
      className={`navbar navbar-expand-lg sticky-top shadow-sm ${isDark ? "bg-dark" : "bg-white"}`}
      style={{
        fontFamily: "'Poppins', sans-serif",
        padding: "0.75rem 0",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <div className="container px-4">
        <NavLink
          className={`navbar-brand fw-bold fs-3 d-flex align-items-center ${
            isDark ? "text-light" : "text-dark"
          }`}
          to="/"
          style={{ letterSpacing: "2px" }}
        >
          <i className="bi bi-patch-question-fill me-2"></i>
          <img src="logo1.png" className="mx-2" alt="" style={{ width: "25px", height: "25px" }} />
          Quizora
        </NavLink>

        <button
          className="navbar-toggler bg-secondary"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon text-light"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center">

            {/* Show only after login */}
            {isLoggedIn && (
              <>
                <li className="nav-item mx-2">
                  <NavLink to="/admin" className={getLinkClass}>
                    <i className="bi bi-person-lock me-1"></i>Admin Panel
                  </NavLink>
                </li>
                <li className="nav-item mx-2">
                  <NavLink to="/quiz-stepper" className={getLinkClass}>
                    <i className="bi bi-pencil-square me-1"></i>Take Quiz
                  </NavLink>
                </li>
                <li className="nav-item mx-2">
                  <NavLink to="/all-quizzes" className={getLinkClass}>
                    <i className="bi bi-collection me-1"></i>All Quizzes
                  </NavLink>
                </li>
              </>
            )}

            {/* Theme Toggle */}
            <li className="nav-item mx-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="themeSwitch"
                  checked={isDark}
                  onChange={toggleTheme}
                />
                <label className="form-check-label text-secondary" htmlFor="themeSwitch">
                  {isDark ? "🌙 Dark" : "🌞 Light"}
                </label>
              </div>
            </li>

            {/* Logout */}
            {isLoggedIn && (
              <li className="nav-item mx-2">
                <button className="btn btn-danger rounded-pill px-3" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-1"></i> Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
