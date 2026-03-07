import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axiosInstance from "../api/axios";

/**
 * A wrapper component that protects routes requiring authentication.
 * It checks the session via the backend before granting access.
 */
const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // Check if the user has an active, valid session
    const checkAuth = async () => {
      try {
        await axiosInstance.get("auth/check_session/");
        // If successful, user is authenticated
        setIsAuth(true);
      } catch {
        // Any error implies unauthenticated or expired session
        setIsAuth(false);
      } finally {
        // End the loading state regardless of outcome
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // While validating the session, render nothing (could be replaced with a loader)
  if (loading) return null;

  // If validation failed, automatically redirect to the login page
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the protected children routes
  return children;
};

export default ProtectedRoute;