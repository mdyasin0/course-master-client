import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "./Context";
import Swal from "sweetalert2";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    if (user && user.role !== "admin") {
      // Set accessDenied state true, then show alert
      setAccessDenied(true);
    }
  }, [user]);

  useEffect(() => {
    if (accessDenied) {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "You have no access to this page",
        confirmButtonText: "OK",
      }).then(() => {
        // After alert closes, redirect
        setAccessDenied(false);
      });
    }
  }, [accessDenied]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (accessDenied) {
    // While alert is open, render nothing
    return null;
  }

  if (user.role !== "admin") {
    // Redirect after alert closes
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;



