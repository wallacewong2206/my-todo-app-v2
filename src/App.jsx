import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TodoPage from './pages/TodoPage';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}

function AppContent() {
  const { darkMode } = useTheme();
  return (
    <div
      className={`min-vh-100 ${
        darkMode ? 'bg-dark text-white' : 'bg-light text-dark'
      }`}
    >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/todos" element={<TodoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
