// frontend/src/Context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // ✅ Named import for modern jwt-decode versions

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
  );

  const [user, setUser] = useState(() =>
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  );

  // ⏰ Auto-logout if token is expired
  useEffect(() => {
    if (authTokens) {
      try {
        const decoded = jwtDecode(authTokens.access);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          logout(); // Auto logout if expired
        }
      } catch (err) {
        console.error("❌ Invalid token:", err);
        logout();
      }
    }
  }, []);

  const login = (tokens, userInfo) => {
    localStorage.setItem('authTokens', JSON.stringify(tokens));
    localStorage.setItem('user', JSON.stringify(userInfo));
    localStorage.setItem('access_token', tokens.access);
    setAuthTokens(tokens);
    setUser(userInfo);
  };

  const logout = () => {
    localStorage.removeItem('authTokens');
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setAuthTokens(null);
    setUser(null);
  };

  const value = {
    authTokens,
    user,
    login,
    logout,
    isAuthenticated: !!authTokens,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;