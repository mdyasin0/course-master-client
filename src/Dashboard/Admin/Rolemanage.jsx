import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Rolemanage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch users
  const fetchUsers = async () => {
    setLoading(true);
    const res = await fetch("https://course-master-server.onrender.com/users");
    const data = await res.json();
    setUsers(data.users);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Update role
  const updateRole = async (userId, newRole) => {
    try {
      const res = await fetch(
        `https://course-master-server.onrender.com/users/update-role/${userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: newRole }),
        }
      );

      const data = await res.json();
      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Role updated!",
          text: `User role has been changed to ${newRole}.`,
          timer: 2000,
          showConfirmButton: false,
        });
        fetchUsers();
      } else {
        Swal.fire({
          icon: "error",
          title: "Update failed",
          text: "Unable to change role. Please try again.",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while updating the role.",
      });
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalUsers = users.length;
  const totalAdmin = users.filter((u) => u.role === "admin").length;
  const totalStudent = users.filter((u) => u.role === "student").length;

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl space-x-3">
        <span className="loading loading-bars loading-xs"></span>
        <span className="loading loading-bars loading-sm"></span>
        <span className="loading loading-bars loading-md"></span>
        <span className="loading loading-bars loading-lg"></span>
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );

  return (
    <div className="p-4 sm:p-8 bg-[#F9FAFB] min-h-screen text-[#111827]">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-[#4F46E5] text-center sm:text-left">
          <h2 className="text-lg font-medium">Total Users</h2>
          <p className="text-3xl sm:text-4xl font-bold mt-2">{totalUsers}</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-[#3B82F6] text-center sm:text-left">
          <h2 className="text-lg font-medium">Total Admins</h2>
          <p className="text-3xl sm:text-4xl font-bold mt-2">{totalAdmin}</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-[#FBBF24] text-center sm:text-left">
          <h2 className="text-lg font-medium">Total Students</h2>
          <p className="text-3xl sm:text-4xl font-bold mt-2">{totalStudent}</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Users Table */}
      <div className="bg-white shadow rounded-xl p-4 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Users List</h2>

        <table className="w-full min-w-[500px] border-collapse">
          <thead>
            <tr className="bg-[#F3F4F6] text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Change Role</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3 font-medium">{user.name}</td>
                <td className="p-3 break-words">{user.email}</td>
                <td className="p-3 capitalize">{user.role}</td>
                <td className="p-3">
                  <select
                    className="border px-3 py-2 rounded-md bg-white focus:ring-2 focus:ring-[#3B82F6] w-full sm:w-auto"
                    value={user.role}
                    onChange={(e) => updateRole(user._id, e.target.value)}
                  >
                    <option value="admin">Admin</option>
                    <option value="student">Student</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Rolemanage;
