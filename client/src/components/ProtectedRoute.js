import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('access_token');

  if (!token) {
    // not logged in
    return <Navigate to="/admin-login" replace />;
  }

  // logged in
  return children;
};

export default ProtectedRoute;
