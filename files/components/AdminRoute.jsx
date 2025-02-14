import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AdminRoute({ children }) {
  const { currentUser } = useAuth();

  // Check if the current user is an admin (you'll need to implement this logic)
  const isAdmin = currentUser && currentUser.email === 'admin@example.com'; // Example admin check

  return isAdmin ? children : <Navigate to="/login" />;
}
