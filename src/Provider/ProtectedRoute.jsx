import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "./Context";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation(); // current path

  if (loading) {
    return <div>Loading...</div>; // spinner 
  }

  if (!user) {
    // login page redirect,and return befor page path 
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
