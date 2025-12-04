import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AdminEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);

  useEffect(() => {
    fetch("https://course-master-server.onrender.com/enrollments")
      .then((res) => res.json())
      .then((data) => {
        setEnrollments(data.enrollments);
        setLoading(false);
      });
  }, []);

  // Approve
  const handleApprove = async (id) => {
    const { value: adminTransactionId } = await Swal.fire({
      title: "Enter Transaction ID to verify",
      input: "text",
      inputPlaceholder: "Transaction ID",
      showCancelButton: true,
    });

    if (!adminTransactionId) return;

    const res = await fetch(
      `https://course-master-server.onrender.com/enrollment/approve/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminTransactionId }),
      }
    );

    const data = await res.json();

    Swal.fire({
      icon: data.message.includes("success") ? "success" : "error",
      title: data.message,
    });

    if (data.message.includes("success")) {
      setEnrollments((prev) =>
        prev.map((en) => (en._id === id ? { ...en, status: "approved" } : en))
      );
    }
  };

  // Block
  const handleBlock = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure you want to BLOCK this enrollment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, block it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    const res = await fetch(
      `https://course-master-server.onrender.com/enrollment/block/${id}`,
      {
        method: "PUT",
      }
    );

    const data = await res.json();

    Swal.fire({
      icon: data.message.includes("success") ? "success" : "error",
      title: data.message,
    });

    setEnrollments((prev) =>
      prev.map((en) => (en._id === id ? { ...en, status: "blocked" } : en))
    );
  };

  // Unblock → Pending
  const handleUnblock = async (id) => {
    const result = await Swal.fire({
      title: "Unblock this enrollment?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, unblock it",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    const res = await fetch(
      `https://course-master-server.onrender.com/enrollment/unblock/${id}`,
      {
        method: "PUT",
      }
    );

    const data = await res.json();

    Swal.fire({
      icon: data.message.includes("success") ? "success" : "error",
      title: data.message,
    });

    setEnrollments((prev) =>
      prev.map((en) => (en._id === id ? { ...en, status: "pending" } : en))
    );
  };

  const statusClass = {
    pending: "bg-accent text-black px-3 py-1 rounded-full",
    approved: "bg-primary text-white px-3 py-1 rounded-full",
    blocked: "bg-red-600 text-white px-3 py-1 rounded-full",
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        <span className="loading loading-bars loading-xs"></span>
        <span className="loading loading-bars loading-sm"></span>
        <span className="loading loading-bars loading-md"></span>
        <span className="loading loading-bars loading-lg"></span>
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto bg-background min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-primary text-center sm:text-left">
        Enrollment Management
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg table-auto">
          <thead>
            <tr className="bg-secondary text-white text-sm sm:text-base">
              <th className="p-2 sm:p-3">Student</th>
              <th className="p-2 sm:p-3">Phone</th>
              <th className="p-2 sm:p-3">Course</th>
              <th className="p-2 sm:p-3">Status</th>
              <th className="p-2 sm:p-3">Transaction</th>
              <th className="p-2 sm:p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {enrollments.map((en) => (
              <tr
                key={en._id}
                className="border-b hover:bg-gray-50 text-sm sm:text-base"
              >
                <td className="p-2 sm:p-3">{en.name}</td>
                <td className="p-2 sm:p-3">{en.phone}</td>
                <td className="p-2 sm:p-3">{en.courseTitle}</td>
                <td className="p-2 sm:p-3">
                  <span className={statusClass[en.status]}>{en.status}</span>
                </td>
                <td className="p-2 sm:p-3 ">{en.transactionId}</td>

                <td className="p-2 sm:p-3 flex gap-1 sm:gap-2 justify-center flex-wrap">
                  {en.status === "pending" && (
                    <button
                      onClick={() => handleApprove(en._id)}
                      className="bg-primary text-white px-2 sm:px-3 py-1 rounded hover:bg-indigo-700 text-xs sm:text-sm"
                    >
                      Approve
                    </button>
                  )}

                  {en.status !== "blocked" && (
                    <button
                      onClick={() => handleBlock(en._id)}
                      className="bg-red-600 text-white px-2 sm:px-3 py-1 rounded hover:bg-red-700 text-xs sm:text-sm"
                    >
                      Block
                    </button>
                  )}

                  {en.status === "blocked" && (
                    <button
                      onClick={() => handleUnblock(en._id)}
                      className="bg-secondary text-white px-2 sm:px-3 py-1 rounded hover:bg-blue-700 text-xs sm:text-sm"
                    >
                      Unblock
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedEnrollment(en)}
                    className="bg-accent text-black px-2 sm:px-3 py-1 rounded hover:bg-yellow-400 text-xs sm:text-sm"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedEnrollment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50 overflow-auto">
          <div className="bg-white w-full max-w-md p-4 sm:p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setSelectedEnrollment(null)}
              className="absolute right-3 top-3 text-gray-600 hover:text-black text-lg sm:text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-primary text-center">
              Student Details
            </h2>

            <div className="space-y-2 text-gray-700 text-sm sm:text-base">
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
              className="w-full mt-4 bg-primary text-white py-2 rounded hover:bg-indigo-700 text-sm sm:text-base"
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
