import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-[#F9FAFB] text-[#111827] shadow-inner">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Top: Info + Links */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 md:gap-0">
          {/* Left: Website Info */}
          <div className="text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#4F46E5]">
              Course-Master
            </h1>
            <p className="text-[#6B7280] mt-1 text-sm sm:text-base">
              Empowering students and instructors with modern e-learning.
            </p>
          </div>

          {/* Right: Quick Links */}
          <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-6 space-y-2 md:space-y-0 text-sm sm:text-base">
            <Link to="/" className="hover:text-[#3B82F6] transition-colors">
              Home
            </Link>
            <Link
              to="/courses"
              className="hover:text-[#3B82F6] transition-colors"
            >
              Courses
            </Link>
            <Link
              to="/dashboard"
              className="hover:text-[#3B82F6] transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/login"
              className="hover:text-[#3B82F6] transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="hover:text-[#3B82F6] transition-colors"
            >
              Register
            </Link>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="mt-6 text-center text-[#6B7280] text-xs sm:text-sm">
          &copy; {new Date().getFullYear()} Course-Master. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
