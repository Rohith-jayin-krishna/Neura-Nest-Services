// frontend/src/Context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
  );

  const [user, setUser] = useState(() =>
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  );

  const login = (tokens, userInfo) => {
    localStorage.setItem('authTokens', JSON.stringify(tokens));
    localStorage.setItem('user', JSON.stringify(userInfo));
    localStorage.setItem('access_token', tokens.access); // optional duplicate
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

// ✅ Export both useAuth and default
export const useAuth = () => useContext(AuthContext);
export default AuthContext;