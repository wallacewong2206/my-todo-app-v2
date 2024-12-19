import React, { createContext, useContext, useState } from "react";
import useLocalStorage from "use-local-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null); // Persist user

  const signup = (email, password) => {
    // Mock signup implementation
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((u) => u.email === email)) {
      throw new Error("User already exists");
    }
    const newUser = { email, password };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    setUser({ email });
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      setUser({ email });
    } else {
      throw new Error("Invalid email or password");
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
