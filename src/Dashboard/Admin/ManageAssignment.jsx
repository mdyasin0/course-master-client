import { useEffect, useState } from "react";

const ManageAssignment = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

 
  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/assignment/submissions");
      const data = await res.json();
      if (data.success) setSubmissions(data.submissions);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setSubmissions([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleMarkComplete = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/assignment/complete/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();
      if (data.success) {
        alert("Assignment marked complete!");
        fetchSubmissions(); // refresh list
      } else {
        alert("Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating assignment status");
    }
  };

  if (loading) return <p>Loading...</p>;

  const totalPending = submissions.filter((s) => s.status === "pending").length;
  const totalComplete = submissions.filter(
    (s) => s.status === "complete"
  ).length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-[#111827]">
        Manage Assignments
      </h2>

      {/* Cards */}
      <div className="flex gap-4 mb-6">
        <div className="bg-white shadow rounded-xl p-4 flex-1 text-center">
          <p className="text-[#6B7280]">Total Assignments</p>
          <p className="text-[#4F46E5] text-xl font-bold">
            {submissions.length}
          </p>
        </div>
        <div className="bg-white shadow rounded-xl p-4 flex-1 text-center">
          <p className="text-[#6B7280]">Pending</p>
          <p className="text-[#FBBF24] text-xl font-bold">{totalPending}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4 flex-1 text-center">
          <p className="text-[#6B7280]">Completed</p>
          <p className="text-[#3B82F6] text-xl font-bold">{totalComplete}</p>
        </div>
      </div>

      {/* Table */}
      <table className="min-w-full divide-y border bg-white rounded-xl">
        <thead className="bg-[#F9FAFB]">
          <tr>
            <th className="px-4 py-2 text-left text-[#111827]">
              Assignment Title
            </th>
            <th className="px-4 py-2 text-left text-[#111827]">
              Assignment Link
            </th>
            <th className="px-4 py-2 text-left text-[#111827]">
              Student Submission
            </th>
            <th className="px-4 py-2 text-left text-[#111827]">Status</th>
            <th className="px-4 py-2 text-left text-[#111827]">Action</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((sub) => (
            <tr key={sub._id} className="border-b">
              <td className="px-4 py-2 text-[#111827]">
                {sub.assignmentTitle}
              </td>
              <td className="px-4 py-2 text-[#3B82F6]">
                <a
                  href={sub.assignmentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </a>
              </td>
              <td className="px-4 py-2 text-[#4F46E5]">
                <a
                  href={sub.studentSubmitLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Submission
                </a>
              </td>
              <td className="px-4 py-2 text-[#6B7280]">{sub.status}</td>
              <td className="px-4 py-2">
                {sub.status === "pending" && (
                  <button
                    className="px-3 py-1 bg-[#4F46E5] text-white rounded hover:bg-[#3B82F6] transition"
                    onClick={() => handleMarkComplete(sub._id)}
                  >
                    Mark Complete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageAssignment;
