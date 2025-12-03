import { NavLink, Outlet } from "react-router";

const StudentDashboardLayout = () => {
  return (
    <div className="bg-[#F9FAFB] min-h-screen flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-[#4F46E5] text-white flex flex-col">
        <h2 className="text-2xl font-bold p-6 border-b border-[#3B82F6]">
          Student Panel
        </h2>

        <nav className="flex-1 p-4 space-y-3">
          <NavLink
            to="/studentdashboard/courseoverview"
            className={({ isActive }) =>
              `block py-2 px-4 rounded font-medium ${
                isActive ? "bg-[#3B82F6]" : "hover:bg-[#3B82F6]"
              }`
            }
          >
            My Courses
          </NavLink>

          <NavLink
            to="/studentdashboard/studentassignment"
            className={({ isActive }) =>
              `block py-2 px-4 rounded font-medium ${
                isActive ? "bg-[#3B82F6]" : "hover:bg-[#3B82F6]"
              }`
            }
          >
            Assignments
          </NavLink>
        </nav>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default StudentDashboardLayout;
