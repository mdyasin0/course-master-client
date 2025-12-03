import { useParams } from "react-router";
import { useEffect, useState } from "react";

const AdminCourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/course/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data.course);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  if (!course) {
    return <p className="text-center text-red-500">Course not found</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Thumbnail */}
        <div>
          <img
            src={course.thumbnail}
            alt={course.title}
            className="rounded-xl shadow-lg w-full"
          />
        </div>

        {/* Info Section */}
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p className="text-gray-700">{course.description}</p>

          <div className="space-y-2 text-lg">
            <p>
              <span className="font-semibold">Instructor:</span>{" "}
              {course.instructor}
            </p>
            <p>
              <span className="font-semibold">Category:</span> {course.category}
            </p>
            <p>
              <span className="font-semibold">Batch:</span> {course.batch}
            </p>
            <p>
              <span className="font-semibold">Price:</span>{" "}
              <span className="text-green-600 font-bold">${course.price}</span>
            </p>
            <p>
              <span className="font-semibold">Total Lessons:</span>{" "}
              {course.lessons.length}
            </p>
            <p>
              <span className="font-semibold">Total Assignments:</span>{" "}
              {course.assignments ? course.assignments.length : 0}
            </p>
          </div>
        </div>
      </div>

      {/* Syllabus */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Syllabus</h2>
        <p className="text-gray-700 bg-gray-100 p-4 rounded-lg shadow">
          {course.syllabus}
        </p>
      </div>

      {/* Video Lessons */}
      {course.lessons.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Video Lessons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {course.lessons.map((url, index) => {
              const embedUrl = url.replace("watch?v=", "embed/");
              return (
                <div
                  key={index}
                  className="rounded-xl overflow-hidden shadow-lg"
                >
                  <iframe
                    width="100%"
                    height="250"
                    src={embedUrl}
                    title={`Lesson ${index + 1}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Assignments */}
      {course.assignments && course.assignments.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Assignments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {course.assignments.map((assn, index) => (
              <div
                key={assn._id || index}
                className="border p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold mb-2">{assn.title}</h3>
                <p className="text-gray-700 mb-2">{assn.description}</p>
                {assn.link && (
                  <a
                    href={assn.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 font-medium hover:underline"
                  >
                    View Assignment
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCourseDetails;
