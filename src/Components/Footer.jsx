import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-[#F9FAFB] text-[#111827] shadow-inner mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Top: Info + Links */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 md:gap-0">
          
          {/* Left: Website Info */}
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-[#4F46E5]">Course-Master</h1>
            <p className="text-[#6B7280] mt-1 text-sm">
              Empowering students and instructors with modern e-learning.
            </p>
          </div>

          {/* Right: Quick Links */}
          <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-6 space-y-2 md:space-y-0">
            <Link to="/" className="hover:text-[#3B82F6]">Home</Link>
            <Link to="/courses" className="hover:text-[#3B82F6]">Courses</Link>
            <Link to="/dashboard" className="hover:text-[#3B82F6]">Dashboard</Link>
            <Link to="/login" className="hover:text-[#3B82F6]">Login</Link>
            <Link to="/register" className="hover:text-[#3B82F6]">Register</Link>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="mt-6 text-center text-[#6B7280] text-sm">
          &copy; {new Date().getFullYear()} Course-Master. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
