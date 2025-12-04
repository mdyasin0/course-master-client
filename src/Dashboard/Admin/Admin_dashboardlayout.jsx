import { Link, Outlet } from "react-router";
import { useState } from "react";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-[#F9FAFB] min-h-screen flex flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-[#4F46E5] text-white p-4">
        <h2 className="text-lg font-bold">Admin Panel</h2>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="focus:outline-none"
        >
          {sidebarOpen ? (
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

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block w-64 bg-[#4F46E5] text-white  flex flex-col transition-all duration-300`}
      >
        <h2 className="hidden md:block text-2xl font-bold p-6 border-b border-[#3B82F6]">
          Admin Panel
        </h2>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/admindashboard/coursemanage"
            className="block py-2 px-4 rounded hover:bg-[#3B82F6] transition-colors"
          >
            Courses-manage
          </Link>
          <Link
            to="/admindashboard/coursecreate"
            className="block py-2 px-4 rounded hover:bg-[#3B82F6] transition-colors"
          >
            Create Course
          </Link>
          <Link
            to="/admindashboard/adminenrollments"
            className="block py-2 px-4 rounded hover:bg-[#3B82F6] transition-colors"
          >
            manage-enrollments
          </Link>
          <Link
            to="/admindashboard/manageassignment"
            className="block py-2 px-4 rounded hover:bg-[#3B82F6] transition-colors"
          >
            manage-assignments
          </Link>
          <Link
            to="/admindashboard/rolemanage"
            className="block py-2 px-4 rounded hover:bg-[#3B82F6] transition-colors"
          >
            Rolemanage
          </Link>
        </nav>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 p-4 md:p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
