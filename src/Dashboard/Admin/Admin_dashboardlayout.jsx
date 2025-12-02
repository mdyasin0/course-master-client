import { Link, Outlet } from "react-router";

const AdminDashboard = () => {
  return (
    <div className="bg-[#F9FAFB] min-h-screen flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-[#4F46E5] text-white flex flex-col">
        <h2 className="text-2xl font-bold p-6 border-b border-[#3B82F6]">
          Admin Panel
        </h2>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="courses"
            className="block py-2 px-4 rounded hover:bg-[#3B82F6]"
          >
            Courses
          </Link>
          <Link
            to = "/admindashboard/coursecreate"
            className="block py-2 px-4 rounded hover:bg-[#3B82F6]"
          >
            Create Course
          </Link>
          <Link
            to="students"
            className="block py-2 px-4 rounded hover:bg-[#3B82F6]"
          >
            Students
          </Link>
          <Link
            to="assignments"
            className="block py-2 px-4 rounded hover:bg-[#3B82F6]"
          >
            Assignments
          </Link>
        </nav>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
