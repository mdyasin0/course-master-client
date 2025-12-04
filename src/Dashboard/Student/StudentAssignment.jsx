import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Provider/Context";
import Swal from "sweetalert2";

const StudentAssignment = () => {
  const { user } = useContext(AuthContext);
  const [combined, setCombined] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitAssignmentFor, setSubmitAssignmentFor] = useState(null);
  const [studentLink, setStudentLink] = useState("");
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(
      `https://course-master-server.onrender.com/user/enrollments-with-courses/${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setCombined(data.combined || []);
        else setCombined([]);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setCombined([]);
        setLoading(false);
      });
  }, [user]);

  const handleSubmitAssignment = async (assignment, enrollmentId) => {
    if (!studentLink) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please provide your submission link!",
      });
      return;
    }

    try {
      const res = await fetch(
        "https://course-master-server.onrender.com/assignment/submit",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            assignmentTitle: assignment.title,
            assignmentDetails: assignment.description,
            assignmentLink: assignment.link,
            studentSubmitLink: studentLink,
            enrollmentId,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Submitted!",
          text: "Assignment submitted successfully!",
        });
        setSubmitAssignmentFor(null);
        setStudentLink("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong!",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error submitting assignment!",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl space-x-3">
        <span className="loading loading-bars loading-xs"></span>
        <span className="loading loading-bars loading-sm"></span>
        <span className="loading loading-bars loading-md"></span>
        <span className="loading loading-bars loading-lg"></span>
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <p className="text-center text-lg mt-10 text-red-500">
        Please log in to see your assignments.
      </p>
    );
  }

  if (!combined.length) {
    return (
      <p className="text-center mt-10 text-lg text-gray-600">
        No enrolled courses found.
      </p>
    );
  }

  const totalAssignments = combined.reduce(
    (acc, item) => acc + (item.course.assignments?.length || 0),
    0
  );
  const totalCompleted = combined.reduce(
    (acc, item) =>
      acc +
      (item.enrollment.assignmentStatus === "complete"
        ? item.course.assignments?.length || 0
        : 0),
    0
  );
  const totalPending = totalAssignments - totalCompleted;

  return (
    <div className="p-4 sm:p-6 bg-[#F9FAFB] min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-[#111827]">
        Your Assignments
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#FFFFFF] shadow rounded-lg p-4 text-center">
          <p className="text-sm text-[#6B7280]">Total Assignments</p>
          <p className="text-2xl font-bold text-[#4F46E5]">
            {totalAssignments}
          </p>
        </div>
        <div className="bg-[#FFFFFF] shadow rounded-lg p-4 text-center">
          <p className="text-sm text-[#6B7280]">Pending</p>
          <p className="text-2xl font-bold text-[#FBBF24]">{totalPending}</p>
        </div>
        <div className="bg-[#FFFFFF] shadow rounded-lg p-4 text-center">
          <p className="text-sm text-[#6B7280]">Completed</p>
          <p className="text-2xl font-bold text-[#3B82F6]">{totalCompleted}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y border bg-[#FFFFFF] rounded-lg shadow">
          <thead className="bg-[#F9FAFB]">
            <tr>
              <th className="px-4 py-2 text-left text-[#111827]">Course</th>
              <th className="px-4 py-2 text-left text-[#111827]">Batch</th>
              <th className="px-4 py-2 text-left text-[#111827]">Assignment</th>
              <th className="px-4 py-2 text-left text-[#111827]">Status</th>
              <th className="px-4 py-2 text-left text-[#111827]">Details</th>
              <th className="px-4 py-2 text-left text-[#111827]">Submit</th>
            </tr>
          </thead>
          <tbody>
            {combined.map(({ enrollment, course }) =>
              (course.assignments || []).map((assignment, idx) => (
                <tr key={idx} className="border-b hover:bg-[#F9FAFB]">
                  <td className="px-4 py-2">{course.title}</td>
                  <td className="px-4 py-2">{course.batch || "-"}</td>
                  <td className="px-4 py-2">{assignment.title}</td>
                  <td className="px-4 py-2">{enrollment.assignmentStatus}</td>
                  <td className="px-4 py-2">
                    <button
                      className="px-3 py-1 bg-[#4F46E5] text-white rounded hover:bg-[#3B82F6]"
                      onClick={() => setModalData(assignment)}
                    >
                      Details
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    {submitAssignmentFor === `${enrollment._id}-${idx}` ? (
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          placeholder="Google Doc / PDF link"
                          className="border px-2 py-1 rounded flex-1 w-full sm:w-auto"
                          value={studentLink}
                          onChange={(e) => setStudentLink(e.target.value)}
                        />
                        <button
                          className="px-3 py-1 bg-[#10B981] text-white rounded hover:bg-green-600"
                          onClick={() =>
                            handleSubmitAssignment(assignment, enrollment._id)
                          }
                        >
                          Submit
                        </button>
                      </div>
                    ) : (
                      <button
                        className="px-3 py-1 bg-[#4F46E5] text-white rounded hover:bg-[#3B82F6]"
                        onClick={() =>
                          setSubmitAssignmentFor(`${enrollment._id}-${idx}`)
                        }
                      >
                        Submit Assignment
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-[#FFFFFF] rounded-lg shadow-lg w-full sm:w-3/4 md:w-1/2 p-6 relative">
            <button
              className="absolute top-3 right-3 text-[#111827] font-bold text-xl"
              onClick={() => setModalData(null)}
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-4 text-[#111827]">
              {modalData.title}
            </h3>
            <p className="text-[#6B7280] mb-2">{modalData.description}</p>
            {modalData.link && (
              <a
                href={modalData.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3B82F6] underline"
              >
                View Assignment Link
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAssignment;
