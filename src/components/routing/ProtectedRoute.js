// src/components/routing/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

// ProtectedRoute component
// It takes the component to render (`element`) and an optional `role` requirement
const ProtectedRoute = ({ element: Component, role, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading, user } = authContext;

  console.log('ProtectedRoute Render:', { isAuthenticated, loading, user, requiredRole: role }); // <<< Add console log


  // While loading, show a loading indicator or null
  if (loading) {
      console.log('ProtectedRoute: Loading...'); // <<< Add console log
      return <div>Loading...</div>; // Or return null; or a Spinner component
  }

  // If not authenticated and loading is false, redirect to login
  if (!isAuthenticated && !loading) {
      console.log('ProtectedRoute: Not authenticated. Redirecting to /login'); // <<< Add console log
    return <Navigate to="/login" />;
  }

  // If a specific role is required, check if the user exists and has that role
  if (role && user && user.role !== role) {
       console.log(`ProtectedRoute: Authenticated but role mismatch. Required: ${role}, User Role: ${user.role}. Redirecting to /`); // <<< Add console log
       // Redirect to home or a "not authorized" page
       return <Navigate to="/" />; // Or <Navigate to="/not-authorized" />;
  }


  // If authenticated (and role matches if specified) and not loading, render the component
   console.log('ProtectedRoute: Authenticated and authorized. Rendering component.'); // <<< Add console log
  return <Component {...rest} />;
};

export default ProtectedRoute;