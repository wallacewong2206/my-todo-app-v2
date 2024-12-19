import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? "bg-dark" : "bg-light"} py-3`}>
      <div className="container-fluid">
        <Link
          to="/"
          className="navbar-brand"
          style={{ color: darkMode ? "white" : "black" }}
        >
          Todo App
        </Link>
        <div>
          <button onClick={toggleDarkMode} className="btn btn-outline-secondary me-2">
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
          {user ? (
            <button onClick={logout} className="btn btn-danger">Logout</button>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary me-2">Login</Link>
              <Link to="/signup" className="btn btn-secondary">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
