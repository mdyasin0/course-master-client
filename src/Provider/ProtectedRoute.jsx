import { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "./Context";


const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation(); // current path

  useEffect(() => {
    if (!loading && !user) {
    
      setTimeout(() => {
        Swal.fire({
          icon: "warning",
          title: "Access Denied",
          text: "Please login to enter this page",
        });
      }, 0);
    }
  }, [loading, user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
