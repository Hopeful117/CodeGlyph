
import React, { createContext, useState, useEffect,useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access');
    setIsLoggedIn(!!token);
  }, []);

  const login = () => setIsLoggedIn(true);
  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);