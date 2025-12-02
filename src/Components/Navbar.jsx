import { useState, useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../Provider/Context";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    await logout();
  };

  // Active link style
  const activeClass =
    "text-[#3B82F6] font-bold border-b-2 border-[#3B82F6] pb-1";
  const normalClass = "hover:text-[#3B82F6]";

  return (
    <nav className="bg-[#F9FAFB] sticky top-0 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left Side Logo */}
          <div className="text-2xl font-bold text-[#4F46E5]">
            <NavLink to="/">Course-Master</NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center text-[#111827] font-medium">
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

            <NavLink
              to="/admindashboard"
              className={({ isActive }) =>
                isActive ? activeClass : normalClass
              }
            >
              aDashboard
            </NavLink>

            <NavLink
              to="/studentdashboard"
              className={({ isActive }) =>
                isActive ? activeClass : normalClass
              }
            >
              sDashboard
            </NavLink>

            {/* CONDITIONAL UI */}
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
                className="text-red-500 font-semibold hover:text-red-600"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-[#111827]">
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
        <div className="md:hidden px-4 pb-4 space-y-2 bg-[#F9FAFB] shadow-md">
          <NavLink
            to="/"
            className="block px-3 py-2 rounded-md hover:bg-[#E0E7FF]"
          >
            Home
          </NavLink>

          <NavLink
            to="/courses"
            className="block px-3 py-2 rounded-md hover:bg-[#E0E7FF]"
          >
            Courses
          </NavLink>

          <NavLink
            to="/studentdashboard"
            className="block px-3 py-2 rounded-md hover:bg-[#E0E7FF]"
          >
            sDashboard
          </NavLink>

          <NavLink
            to="/admindashboard"
            className="block px-3 py-2 rounded-md hover:bg-[#E0E7FF]"
          >
            aDashboard
          </NavLink>

          {!user ? (
            <>
              <NavLink
                to="/login"
                className="block px-3 py-2 rounded-md hover:bg-[#E0E7FF]"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="block px-3 py-2 rounded-md hover:bg-[#E0E7FF]"
              >
                Register
              </NavLink>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="block px-3 py-2 rounded-md text-red-500 font-semibold"
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
