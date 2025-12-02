import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const CourseDetails = () => {
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
          </div>

          <Link
            to="/login"
            className="mt-4 inline-block bg-[#4F46E5] text-white px-6 py-3 rounded-md hover:bg-[#3B82F6] transition text-center"
          >
            For Enroll Click Here
          </Link>
        </div>
      </div>

      {/* Syllabus */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Syllabus</h2>
        <p className="text-gray-700 bg-gray-100 p-4 rounded-lg shadow">
          {course.syllabus}
        </p>
      </div>
    </div>
  );
};

export default CourseDetails;
