import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import isAuthUser from "../utils/isAuthUser";

function PrivateRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const authInfo = await isAuthUser();
      setIsAuthenticated(authInfo.isAuthenticated);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    // Handle loading state, you might show a loading spinner
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // If not authenticated, redirect to login page with the return URL
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child components
  return children;
}

export default PrivateRoute;
