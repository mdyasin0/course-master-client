import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Provider/Context";

const formatDateTime = (iso) => {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
};

//  take video id from url 
const extractYouTubeId = (url) => {
  const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

// ==========================
// UPDATED LESSON MODAL
// ==========================
const LessonModal = ({ lessons, enrollmentId, onClose }) => {
  const [current, setCurrent] = useState(0);

  const goNext = () => {
    if (current < lessons.length - 1) setCurrent(current + 1);
  };

  const goPrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  // COURSE COMPLETE handler
  const handleComplete = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/course/complete/${enrollmentId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("🎉 Course Completed Successfully!");
        onClose();
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      alert("Error completing course.");
    }
  };

  if (!lessons || lessons.length === 0) return null;

  const currentVideoId = extractYouTubeId(lessons[current]);
  const embedUrl = currentVideoId
    ? `https://www.youtube.com/embed/${currentVideoId}`
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-6 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-lg"
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
        <div className="flex justify-between mt-4">
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
            className="mt-5 w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
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
    fetch(`http://localhost:5000/user/enrollments-with-courses/${user.email}`)
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

  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (!user)
    return <p className="text-center">Please login to see your courses.</p>;
  if (!combined.length)
    return <p className="text-center">No enrolled courses found.</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Available Courses</h2>

        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Instructor</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Enrolled At</th>
                <th className="px-4 py-3 text-center">Details</th>
                <th className="px-4 py-3 text-center">Start</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {combined.map(({ enrollment, course }) => {
                const courseId =
                  course?._id ||
                  enrollment.courseId?.toString?.() ||
                  enrollment.courseId;

                return (
                  <tr key={enrollment._id}>
                    <td className="px-4 py-3 font-semibold">
                      {course?.title || "Course not found"}
                    </td>
                    <td className="px-4 py-3">{course?.instructor || "-"}</td>
                    <td className="px-4 py-3">{enrollment.name}</td>
                    <td className="px-4 py-3">
                      {formatDateTime(enrollment.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() =>
                          setModalCourse(course || { title: "Details" })
                        }
                        className="px-3 py-1 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-600 hover:text-white transition"
                      >
                        Details
                      </button>
                    </td>

                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => {
                          setOpenLessonsFor(
                            openLessonsFor === courseId ? null : courseId
                          );
                          setSelectedEnrollmentId(enrollment._id); // important
                        }}
                        className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-4 border-b pb-3">
                <h3 className="text-xl font-bold">{modalCourse.title}</h3>
                <button
                  onClick={() => setModalCourse(null)}
                  className="text-gray-600 hover:text-black"
                >
                  ✕
                </button>
              </div>

              {/* Body */}
              <p className="text-gray-700">{modalCourse.description}</p>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setModalCourse(null)}
                  className="px-5 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-600 hover:text-white"
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
