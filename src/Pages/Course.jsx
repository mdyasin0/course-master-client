import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://course-master-server.onrender.com/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.courses || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const categories = [...new Set(courses.map((course) => course.category))];

  let displayedCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.instructor.toLowerCase().includes(search.toLowerCase())
  );

  if (filter) {
    displayedCourses = displayedCourses.filter(
      (course) => course.category === filter
    );
  }

  if (sort === "priceLowHigh") {
    displayedCourses.sort((a, b) => a.price - b.price);
  } else if (sort === "priceHighLow") {
    displayedCourses.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="bg-[#F9FAFB] min-h-screen py-8 px-4 sm:px-6 lg:px-12">
      <h1 className="text-3xl font-bold text-[#4F46E5] text-center mb-8">
        All Courses
      </h1>

      {/* Search + Filter + Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by title or instructor..."
          className="px-4 py-2 rounded border border-gray-300 w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="px-4 py-2 rounded border border-gray-300 w-full sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          className="px-4 py-2 rounded border border-gray-300 w-full sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="priceLowHigh">Price: Low → High</option>
          <option value="priceHighLow">Price: High → Low</option>
        </select>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-bars loading-xl"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedCourses.map((course) => (
            <div
              key={course._id}
              onClick={() => navigate(`/coursedetails/${course._id}`)}
              className="bg-white rounded-lg shadow hover:shadow-xl transition p-4 cursor-pointer flex flex-col"
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

              <p className="text-[#FBBF24] mt-1 text-sm font-semibold">
                {course.category}
              </p>

              <Link
                to={`/coursedetails/${course._id}`}
                className="mt-4 inline-block bg-[#4F46E5] text-white px-4 py-2 rounded hover:bg-[#3B82F6] transition text-center"
              >
                Enroll Now
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
