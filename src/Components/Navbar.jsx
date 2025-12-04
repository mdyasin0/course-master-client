import { useState, useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../Provider/Context";
import Swal from "sweetalert2";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4F46E5",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    });

    if (result.isConfirmed) {
      await logout();
      Swal.fire({
        icon: "success",
        title: "Logged out successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const activeClass =
    "text-[#3B82F6] font-bold border-b-2 border-[#3B82F6] pb-1";
  const normalClass = "hover:text-[#3B82F6] transition-colors";

  return (
    <nav className="bg-[#F9FAFB] sticky top-0 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="text-2xl sm:text-3xl font-bold text-[#4F46E5]">
            <NavLink to="/">Course-Master</NavLink>
          </div>

          <div className="hidden md:flex space-x-6 items-center text-[#111827] font-medium text-sm sm:text-base">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? activeClass : normalClass
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/courses"
              className={({ isActive }) =>
                isActive ? activeClass : normalClass
              }
            >
              Courses
            </NavLink>

            {/* Dashboard role-based */}
            {user && user.role === "admin" && (
              <NavLink
                to="/admindashboard"
                className={({ isActive }) =>
                  isActive ? activeClass : normalClass
                }
              >
                Dashboard
              </NavLink>
            )}

            {user && user.role === "student" && (
              <NavLink
                to="/studentdashboard"
                className={({ isActive }) =>
                  isActive ? activeClass : normalClass
                }
              >
                Dashboard
              </NavLink>
            )}

            {/* Auth links */}
            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  Register
                </NavLink>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="text-red-500 font-semibold hover:text-red-600 transition-colors"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-[#111827] focus:outline-none"
            >
              {isOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-[#F9FAFB] shadow-md text-sm">
          <NavLink
            to="/"
            className="block px-3 py-2 rounded-md hover:bg-[#E0E7FF] transition-colors"
          >
            Home
          </NavLink>

          <NavLink
            to="/courses"
            className="block px-3 py-2 rounded-md hover:bg-[#E0E7FF] transition-colors"
          >
            Courses
          </NavLink>

          {user && user.role === "admin" && (
            <NavLink
              to="/admindashboard"
              className="block px-3 py-2 rounded-md hover:bg-[#E0E7FF] transition-colors"
            >
              Dashboard
            </NavLink>
          )}

          {user && user.role === "student" && (
            <NavLink
              to="/studentdashboard"
              className="block px-3 py-2 rounded-md hover:bg-[#E0E7FF] transition-colors"
            >
              Dashboard
            </NavLink>
          )}

          {!user ? (
            <>
              <NavLink
                to="/login"
                className="block px-3 py-2 rounded-md hover:bg-[#E0E7FF] transition-colors"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="block px-3 py-2 rounded-md hover:bg-[#E0E7FF] transition-colors"
              >
                Register
              </NavLink>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="block px-3 py-2 rounded-md text-red-500 font-semibold hover:bg-red-100 transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
