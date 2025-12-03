import { useEffect, useState } from "react";

const AdminEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);


  useEffect(() => {
    fetch("http://localhost:5000/enrollments")
      .then((res) => res.json())
      .then((data) => {
        setEnrollments(data.enrollments);
        setLoading(false);
      });
  }, []);

  // Approve
  const handleApprove = async (id) => {
    const adminTransactionId = prompt("Enter Transaction ID to verify:");
    if (!adminTransactionId) return;

    const res = await fetch(`http://localhost:5000/enrollment/approve/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adminTransactionId }),
    });

    const data = await res.json();
    alert(data.message);

    if (data.message.includes("success")) {
      setEnrollments((prev) =>
        prev.map((en) => (en._id === id ? { ...en, status: "approved" } : en))
      );
    }
  };

  // Block
  const handleBlock = async (id) => {
    const ok = confirm("Are you sure you want to BLOCK this enrollment?");
    if (!ok) return;

    const res = await fetch(`http://localhost:5000/enrollment/block/${id}`, {
      method: "PUT",
    });

    const data = await res.json();
    alert(data.message);

    setEnrollments((prev) =>
      prev.map((en) => (en._id === id ? { ...en, status: "blocked" } : en))
    );
  };

  // Unblock → Pending
  const handleUnblock = async (id) => {
    const ok = confirm("Unblock this enrollment?");
    if (!ok) return;

    const res = await fetch(`http://localhost:5000/enrollment/unblock/${id}`, {
      method: "PUT",
    });

    const data = await res.json();
    alert(data.message);

    setEnrollments((prev) =>
      prev.map((en) => (en._id === id ? { ...en, status: "pending" } : en))
    );
  };

  // Status Badge Style
  const statusClass = {
    pending: "bg-accent text-black px-3 py-1 rounded-full",
    approved: "bg-primary text-white px-3 py-1 rounded-full",
    blocked: "bg-red-600 text-white px-3 py-1 rounded-full",
  };

  if (loading)
    return (
      <h2 className="text-center text-xl mt-20 text-primary">
        Loading enrollments...
      </h2>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto bg-background min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-primary">
        Enrollment Management
      </h1>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-secondary text-white">
              <th className="p-3">Student</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Course</th>
              <th className="p-3">Status</th>
              <th className="p-3">Transaction</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {enrollments.map((en) => (
              <tr key={en._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{en.name}</td>
                <td className="p-3">{en.phone}</td>
                <td className="p-3">{en.courseTitle}</td>
                <td className="p-3">
                  <span className={statusClass[en.status]}>{en.status}</span>
                </td>
                <td className="p-3">{en.transactionId}</td>

                <td className="p-3 flex gap-2 justify-center flex-wrap">
                  {/* Approve button only hides after approved */}
                  {en.status === "pending" && (
                    <button
                      onClick={() => handleApprove(en._id)}
                      className="bg-primary text-white px-3 py-1 rounded hover:bg-indigo-700"
                    >
                      Approve
                    </button>
                  )}

                  {/* Block button always visible except when already blocked */}
                  {en.status !== "blocked" && (
                    <button
                      onClick={() => handleBlock(en._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Block
                    </button>
                  )}

                  {/* Unblock only shows when blocked */}
                  {en.status === "blocked" && (
                    <button
                      onClick={() => handleUnblock(en._id)}
                      className="bg-secondary text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Unblock
                    </button>
                  )}

                  {/* Details button always visible */}
                  <button
                    onClick={() => setSelectedEnrollment(en)}
                    className="bg-accent text-black px-3 py-1 rounded hover:bg-yellow-400"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DETAILS MODAL */}
      {selectedEnrollment && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setSelectedEnrollment(null)}
              className="absolute right-3 top-3 text-gray-600 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4 text-primary text-center">
              Student Details
            </h2>

            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Name:</strong> {selectedEnrollment.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedEnrollment.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedEnrollment.phone}
              </p>
              <p>
                <strong>Course:</strong> {selectedEnrollment.courseTitle}
              </p>
              <p>
                <strong>Payment Method:</strong>{" "}
                {selectedEnrollment.paymentMethod}
              </p>
              <p>
                <strong>Amount:</strong> ${selectedEnrollment.amount}
              </p>
              <p>
                <strong>Transaction ID:</strong>{" "}
                {selectedEnrollment.transactionId}
              </p>
              <p>
                <strong>Status:</strong> {selectedEnrollment.status}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(selectedEnrollment.createdAt).toLocaleString()}
              </p>
            </div>

            <button
              onClick={() => setSelectedEnrollment(null)}
              className="w-full mt-4 bg-primary text-white py-2 rounded hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEnrollments;
