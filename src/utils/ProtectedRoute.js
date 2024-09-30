// ProtectedRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user); // Access the user state from Redux

  // Check if user is logged in
  if (!user.userInfo.isLogin) {
    return <Navigate to="/" />; // Redirect to home or login page if not logged in
  }

  return children; // Render the protected component if logged in
};

export default ProtectedRoute;
