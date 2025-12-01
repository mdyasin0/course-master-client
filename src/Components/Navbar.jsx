import React, { useState } from "react";
import { Link } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#F9FAFB] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left: Logo / Website Name */}
          <div className=" text-2xl font-bold text-[#4F46E5]">
            <Link to="/">Course-Master</Link>
          </div>

          {/* Right: Links */}
          <div className="hidden md:flex space-x-6 items-center text-[#111827] font-medium">
            <Link to="/" className="hover:text-[#3B82F6]">
              Home
            </Link>
            <Link to="/courses" className="hover:text-[#3B82F6]">
              Courses
            </Link>
            <Link to="/dashboard" className="hover:text-[#3B82F6]">
              Dashboard
            </Link>
            <Link to="/login" className="hover:text-[#3B82F6]">
              Login
            </Link>
            <Link to="/register" className="hover:text-[#3B82F6]">
              Register
            </Link>
            <Link to="/logout" className="hover:text-[#FBBF24]">
              Logout
            </Link>
          </div>

          {/* Mobile Menu Button */}
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
                  xmlns="http://www.w3.org/2000/svg"
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
                  xmlns="http://www.w3.org/2000/svg"
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
        <div className="md:hidden px-2 pt-2 pb-4 space-y-1 bg-[#F9FAFB] shadow-md">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md hover:bg-[#E0E7FF]"
          >
            Home
          </Link>
          <Link
            to="/courses"
            className="block px-3 py-2 rounded-md hover:bg-[#E0E7FF]"
          >
            Courses
          </Link>
          <Link
            to="/dashboard"
            className="block px-3 py-2 rounded-md hover:bg-[#E0E7FF]"
          >
            Dashboard
          </Link>
          <Link
            to="/login"
            className="block px-3 py-2 rounded-md hover:bg-[#E0E7FF]"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block px-3 py-2 rounded-md hover:bg-[#E0E7FF]"
          >
            Register
          </Link>
          <Link
            to="/logout"
            className="block px-3 py-2 rounded-md hover:bg-[#FBBF24]"
          >
            Logout
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
