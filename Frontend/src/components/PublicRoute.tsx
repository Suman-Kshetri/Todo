import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface PublicRouteProp {
  children:  React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProp> = ({ children }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/home" replace />;
  }

  // Else render the protected page/component
  return children;
};
export default PublicRoute