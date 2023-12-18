import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import isAuthAdmin from "../utils/isAuthAdmin";

function AdminPrivateRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState({
    is_authenticated: false,
    is_admin: false,
  });
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const authInfo = await isAuthAdmin();
      setIsAuthenticated({
        is_authenticated: authInfo.isAuthenticated,
        is_admin: authInfo.isAdmin,
      });
      setLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    // Handle loading state, you might show a loading spinner
    return <div>Loading...</div>;
  }

  if (!isAuthenticated.is_authenticated) {
    return <Navigate to="/admin/login" />;
  }

  if (!isAuthenticated.is_admin) {
    // If not authenticated, redirect to login page with the return URL
    return <Navigate to="/admin/login" />;
  }

  // If authenticated, render the child components
  return children;
}

export default AdminPrivateRoute;
