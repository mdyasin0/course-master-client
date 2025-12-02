import { NavLink, Outlet } from "react-router";

const StudentDashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">

      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-2xl font-bold text-[#111827] mb-6">
          Student Panel
        </h2>

        <nav className="space-y-3">
          <NavLink
            to="courses"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg font-medium ${
                isActive
                  ? "bg-[#4F46E5] text-white"
                  : "text-[#4F46E5] border border-[#4F46E5] hover:bg-[#4F46E5] hover:text-white"
              }`
            }
          >
            My Courses
          </NavLink>

          <NavLink
            to="assignments"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg font-medium ${
                isActive
                  ? "bg-[#4F46E5] text-white"
                  : "text-[#4F46E5] border border-[#4F46E5] hover:bg-[#4F46E5] hover:text-white"
              }`
            }
          >
            Assignments
          </NavLink>

          <NavLink
            to="profile"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg font-medium ${
                isActive
                  ? "bg-[#4F46E5] text-white"
                  : "text-[#4F46E5] border border-[#4F46E5] hover:bg-[#4F46E5] hover:text-white"
              }`
            }
          >
            Profile
          </NavLink>
        </nav>
      </aside>

      {/* RIGHT SIDE OUTLET */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentDashboardLayout;
