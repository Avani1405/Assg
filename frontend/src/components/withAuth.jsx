import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
      return <div>Loading...</div>;
    }

    const isAuthenticated = !!user;

    return isAuthenticated ? <WrappedComponent {...props} /> : <Navigate to="/login" replace />;
  };
};

export default withAuth;
