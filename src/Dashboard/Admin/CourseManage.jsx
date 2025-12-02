import { useEffect, useState } from "react";
import { Link } from "react-router";

const CourseManage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all courses
  const fetchCourses = () => {
    fetch("http://localhost:5000/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.courses);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Delete course
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      fetch(`http://localhost:5000/course/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            alert("Course deleted successfully!");
            setCourses(courses.filter((c) => c._id !== id)); // remove from table
          } else {
            alert("Delete failed!");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#4F46E5]">Manage Courses</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-[#4F46E5] text-white">
            <tr>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Instructor</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-4">{course.title}</td>
                <td className="py-3 px-4">{course.instructor}</td>
                <td className="py-3 px-4">${course.price}</td>
                <td className="py-3 px-4 text-center space-x-2">
                  <Link
                    to={`/admindashboard/admincoursedetails/${course._id}`}
                    className="bg-[#3B82F6] text-white px-3 py-1 rounded hover:bg-[#2563EB] transition"
                  >
                    Details
                  </Link>
                  <Link
                    to={`/admindashboard/Admincourseupdate/${course._id}`}
                    className="bg-[#FBBF24] text-[#111827] px-3 py-1 rounded hover:bg-[#fcd34d] transition"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseManage;
