import { useEffect, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";

const CourseManage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = () => {
    fetch("https://course-master-server.onrender.com/courses")
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
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    fetch(`https://course-master-server.onrender.com/course/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCourses(courses.filter((c) => c._id !== id));
          Swal.fire("Deleted!", "Course has been deleted.", "success");
        } else {
          Swal.fire("Error!", "Delete failed!", "error");
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error!", "Something went wrong!", "error");
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        <span className="loading loading-bars loading-xs"></span>
        <span className="loading loading-bars loading-sm"></span>
        <span className="loading loading-bars loading-md"></span>
        <span className="loading loading-bars loading-lg"></span>
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-[#4F46E5] text-center sm:text-left">
        Manage Courses
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow table-auto">
          <thead className="bg-[#4F46E5] text-white text-sm sm:text-base">
            <tr>
              <th className="py-2 sm:py-3 px-2 sm:px-4 text-left">Title</th>
              <th className="py-2 sm:py-3 px-2 sm:px-4 text-left">
                Instructor
              </th>
              <th className="py-2 sm:py-3 px-2 sm:px-4 text-left">Price</th>
              <th className="py-2 sm:py-3 px-2 sm:px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr
                key={course._id}
                className="border-b hover:bg-gray-100 text-sm sm:text-base"
              >
                <td className="py-2 sm:py-3 px-2 sm:px-4">{course.title}</td>
                <td className="py-2 sm:py-3 px-2 sm:px-4">
                  {course.instructor}
                </td>
                <td className="py-2 sm:py-3 px-2 sm:px-4">${course.price}</td>
                <td className="py-2 sm:py-3 px-2 sm:px-4 text-center flex flex-col sm:flex-row gap-1 sm:gap-2 justify-center">
                  <Link
                    to={`/admindashboard/admincoursedetails/${course._id}`}
                    className="bg-[#3B82F6] text-white px-2 sm:px-3 py-1 rounded hover:bg-[#2563EB] transition text-xs sm:text-sm text-center"
                  >
                    Details
                  </Link>
                  <Link
                    to={`/admindashboard/Admincourseupdate/${course._id}`}
                    className="bg-[#FBBF24] text-[#111827] px-2 sm:px-3 py-1 rounded hover:bg-[#fcd34d] transition text-xs sm:text-sm text-center"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded hover:bg-red-600 transition text-xs sm:text-sm"
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
