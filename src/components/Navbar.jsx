// Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
      }`}
    >
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Todo App
        </Link>
        <div>
          <button onClick={toggleDarkMode} className="btn btn-secondary me-2">
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
          <Link to="/todos" className="btn btn-outline-primary me-2">
            Todo List
          </Link>
          {user ? (
            <button onClick={logout} className="btn btn-danger">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary me-2">
                Login
              </Link>
              <Link to="/signup" className="btn btn-secondary">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
