import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "./Context";
import Swal from "sweetalert2";

const StudentRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (user && user.role !== "student") {
      setShowAlert(true);
    }
  }, [user]);

  if (loading) {
    // Loading spinner
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  if (!user) {
    // If not logged in
    return <Navigate to="/login" replace />;
  }

  if (showAlert) {
    Swal.fire({
      icon: "error",
      title: "Access Denied",
      text: "You have no access to this page",
    });
    setShowAlert(false); // Show only once
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default StudentRoute;
