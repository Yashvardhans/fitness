import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import axios from 'axios';

const AdminRoute = ({ element: Component, ...rest }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user/profile');
        const { isAdmin } = response.data;
        setIsAdmin(isAdmin);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <React.Fragment>
      <Route
        path="/admin"
        {...rest}
        element={isAdmin ? <Component /> : <Navigate to="/" replace />}
      />
      {!isAdmin && <Navigate to="/" replace />}
    </React.Fragment>
  );
};

export default AdminRoute;
