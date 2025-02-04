import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('admin-auth'); // This is for demo, ideally use a proper auth method

  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? (
          <Component />
        ) : (
          <Navigate to="/admin/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
