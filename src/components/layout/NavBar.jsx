import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.body.className = isDark ? "bg-dark text-light" : "bg-light text-dark";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const getLinkClass = ({ isActive }) =>
    `nav-link px-3 py-2 rounded ${isDark ? "text-light" : "text-dark"} ${
      isActive ? (isDark ? "bg-light text-dark fw-bold" : "bg-dark text-white fw-bold") : ""
    }`;

  const getButtonClass = ({ isActive }) =>
    `btn ${isDark ? "btn-outline-light" : "btn-outline-dark"} px-3 py-2 rounded-pill ${
      isActive ? "fw-bold border-2" : ""
    }`;

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
          <i className="bi bi-patch-question-fill me-2"></i> <img src="logo1.png" className="mx-2" alt="" style={{width:"25px", height:"25px"}} />  Quizora
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
              <NavLink to="/all-quizzes" className={getButtonClass}>
                <i className="bi bi-collection me-1"></i>All Quizzes
              </NavLink>
            </li>
            <li className="nav-item ms-3">
              <button
                onClick={toggleTheme}
                className={`btn btn-sm ${isDark ? "btn-light" : "btn-dark"} rounded-pill`}
              >
                {isDark ? "🌞 Light Mode" : "🌙 Dark Mode"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
