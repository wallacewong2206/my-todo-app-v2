import React, { createContext, useContext } from 'react';
import useLocalStorage from 'use-local-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);

  const signup = (email, password) => {
    // Save the user's email and password in localStorage for simplicity
    localStorage.setItem('auth', JSON.stringify({ email, password }));
    setUser({ email });
  };

  const login = (email, password) => {
    const storedUser = JSON.parse(localStorage.getItem('auth'));
    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      setUser({ email });
    } else {
      throw new Error('Invalid email or password');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('todos'); // Clear todos on logout
    localStorage.removeItem('auth'); // Optionally clear auth info on logout
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
