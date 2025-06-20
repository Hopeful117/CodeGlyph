import React, { createContext, useState, useEffect, useContext } from 'react';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      try {
        const { exp } = jwtDecode(token);
        if (Date.now() < exp * 1000) {
          setIsLoggedIn(true);
        } else {
          // Token expiré
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
          setIsLoggedIn(false);
        }
      } catch (error) {
        // Token invalide
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
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
