import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5000/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.courses.slice(0, 4)); // only first 4 courses
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-[#F9FAFB] min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-[#4F46E5]">
          Welcome to Course-Master
        </h1>
        <p className="text-[#6B7280] mt-4 text-lg md:text-xl">
          Empowering students and instructors with modern e-learning.
        </p>

        <Link
          to="/courses"
          className="mt-6 inline-block bg-[#4F46E5] text-white px-6 py-3 rounded-md hover:bg-[#3B82F6] transition"
        >
          Browse All Courses
        </Link>
      </section>

      {/* Featured Courses */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-semibold text-[#111827] mb-8 text-center">
          Featured Courses
        </h2>

        <div className="grid grid-cols-1 cursor-pointer sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              onClick={() => navigate(`/coursedetails/${course._id}`)}
              className="bg-white rounded-lg shadow hover:shadow-xl transition p-4"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-40 object-cover rounded-md"
              />

              <h3 className="text-xl font-bold text-[#111827] mt-4">
                {course.title}
              </h3>

              <p className="text-[#6B7280] mt-1 text-sm">{course.instructor}</p>

              <p className="text-[#111827] font-semibold mt-2">
                ${course.price}
              </p>

              <Link
                to={`/coursedetails/${course._id}`}
                className="mt-4 inline-block bg-[#4F46E5] text-white px-4 py-2 rounded hover:bg-[#3B82F6] transition"
              >
                Enroll Now
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#4F46E5] text-white text-center py-12 mt-16">
        <h2 className="text-3xl font-bold mb-4">Start Learning Today!</h2>
        <p className="text-[#F9FAFB] mb-6">
          Join thousands of students and instructors on Course-Master.
        </p>

        <Link
          to="/register"
          className="bg-[#FBBF24] text-[#111827] px-6 py-3 rounded-md font-semibold hover:bg-[#fcd34d] transition"
        >
          Register Now
        </Link>
      </section>
    </div>
  );
};

export default Home;
