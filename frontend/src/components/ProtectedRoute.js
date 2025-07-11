// frontend/src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext'; // Import the useAuth hook (Note the capital 'C' in Context)

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Get the 'user' state from your AuthContext

  // If 'user' is null, it means no one is logged in
  if (!user) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/login" replace />;
  }

  // If 'user' exists, render the protected content
  return children;
};

export default ProtectedRoute;
