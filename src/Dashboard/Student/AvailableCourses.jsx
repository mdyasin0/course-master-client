import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Provider/Context";
import Swal from "sweetalert2";

// Helper functions
const formatDateTime = (iso) => {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
};

const extractYouTubeId = (url) => {
  const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

// ==========================
// LESSON MODAL
// ==========================
const LessonModal = ({ lessons, enrollmentId, onClose }) => {
  const [current, setCurrent] = useState(0);

  const goNext = () => {
    if (current < lessons.length - 1) setCurrent(current + 1);
  };

  const goPrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const handleComplete = async () => {
    try {
      const res = await fetch(
        `https://course-master-server.onrender.com/course/complete/${enrollmentId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "🎉 Course Completed!",
          text: "You have successfully completed this course.",
          timer: 2000,
          showConfirmButton: false,
        });
        onClose();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Something went wrong while completing the course.",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to complete the course. Please try again.",
      });
    }
  };

  if (!lessons || lessons.length === 0) return null;

  const currentVideoId = extractYouTubeId(lessons[current]);
  const embedUrl = currentVideoId
    ? `https://www.youtube.com/embed/${currentVideoId}`
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-full md:max-w-3xl p-4 md:p-6 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-500 hover:text-black text-lg md:text-xl"
        >
          ✕
        </button>

        {/* Video Player */}
        <div className="relative w-full h-64 md:h-96 overflow-hidden">
          {embedUrl ? (
            <iframe
              key={current}
              src={embedUrl}
              title={`Lesson ${current + 1}`}
              frameBorder="0"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          ) : (
            <p className="text-center text-red-500 mt-10">
              Invalid YouTube URL
            </p>
          )}
        </div>

        <p className="mt-2 text-center font-medium">
          Lesson {current + 1} of {lessons.length}
        </p>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between mt-4 gap-2">
          <button
            onClick={goPrev}
            disabled={current === 0}
            className={`px-4 py-2 rounded-md border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition ${
              current === 0 && "opacity-50 cursor-not-allowed"
            }`}
          >
            Previous
          </button>

          <button
            onClick={goNext}
            disabled={current === lessons.length - 1}
            className={`px-4 py-2 rounded-md border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition ${
              current === lessons.length - 1 && "opacity-50 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>

        {/* COMPLETE COURSE BUTTON */}
        {current === lessons.length - 1 && (
          <button
            onClick={handleComplete}
            className="mt-4 md:mt-5 w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Complete Course
          </button>
        )}
      </div>
    </div>
  );
};

// ==========================
// MAIN PAGE
// ==========================
const AvailableCourses = () => {
  const { user } = useContext(AuthContext);
  const [combined, setCombined] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalCourse, setModalCourse] = useState(null);
  const [openLessonsFor, setOpenLessonsFor] = useState(null);
  const [selectedEnrollmentId, setSelectedEnrollmentId] = useState(null);

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
        console.error("Fetch failed:", err);
        setCombined([]);
        setLoading(false);
      });
  }, [user]);

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

  if (!user)
    return <p className="text-center">Please login to see your courses.</p>;
  if (!combined.length)
    return <p className="text-center">No enrolled courses found.</p>;

  return (
    <div className="p-4 sm:p-6 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
          Available Courses
        </h2>

        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y text-sm sm:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 sm:px-4 py-2 text-left">Title</th>
                <th className="px-3 sm:px-4 py-2 text-left">Instructor</th>
                <th className="px-3 sm:px-4 py-2 text-left">Name</th>
                <th className="px-3 sm:px-4 py-2 text-left">Enrolled At</th>
                <th className="px-3 sm:px-4 py-2 text-center">Details</th>
                <th className="px-3 sm:px-4 py-2 text-center">Start</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {combined.map(({ enrollment, course }) => {
                const courseId =
                  course?._id ||
                  enrollment.courseId?.toString?.() ||
                  enrollment.courseId;

                return (
                  <tr
                    key={enrollment._id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-3 sm:px-4 py-2 font-semibold">
                      {course?.title || "Course not found"}
                    </td>
                    <td className="px-3 sm:px-4 py-2">
                      {course?.instructor || "-"}
                    </td>
                    <td className="px-3 sm:px-4 py-2">{enrollment.name}</td>
                    <td className="px-3 sm:px-4 py-2">
                      {formatDateTime(enrollment.createdAt)}
                    </td>
                    <td className="px-3 sm:px-4 py-2 text-center">
                      <button
                        onClick={() =>
                          setModalCourse(course || { title: "Details" })
                        }
                        className="px-2 sm:px-3 py-1 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-600 hover:text-white transition"
                      >
                        Details
                      </button>
                    </td>

                    <td className="px-3 sm:px-4 py-2 text-center">
                      <button
                        onClick={() => {
                          setOpenLessonsFor(
                            openLessonsFor === courseId ? null : courseId
                          );
                          setSelectedEnrollmentId(enrollment._id);
                        }}
                        className="px-2 sm:px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                      >
                        Start Course
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* LESSON MODAL */}
        {openLessonsFor &&
          (() => {
            const item = combined.find(
              (c) =>
                (c.course?._id || c.enrollment.courseId?.toString?.()) ===
                openLessonsFor
            );

            if (!item?.course) return null;

            return (
              <LessonModal
                lessons={item.course.lessons}
                enrollmentId={selectedEnrollmentId}
                onClose={() => setOpenLessonsFor(null)}
              />
            );
          })()}

        {/* DETAILS MODAL */}
        {modalCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-2 sm:p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-full sm:max-w-3xl p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 border-b pb-3 gap-2 sm:gap-0">
                <h3 className="text-lg sm:text-xl font-bold">
                  {modalCourse.title}
                </h3>
                <button
                  onClick={() => setModalCourse(null)}
                  className="text-gray-600 hover:text-black"
                >
                  ✕
                </button>
              </div>
              <p className="text-gray-700">{modalCourse.description}</p>
              <div className="flex justify-end mt-4 sm:mt-6">
                <button
                  onClick={() => setModalCourse(null)}
                  className="px-4 sm:px-5 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-600 hover:text-white transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableCourses;
