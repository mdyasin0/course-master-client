import React, { useState } from "react";
import { Link } from "react-router";

// Dummy courses data
const dummyCourses = [
  {
    id: 1,
    title: "React for Beginners",
    instructor: "Jhankar Mahbub",
    price: "$50",
    category: "Frontend",
    description: "Learn React from scratch and build amazing web apps.",
  },
  {
    id: 2,
    title: "Node.js Masterclass",
    instructor: "Mithun Sarkar",
    price: "$60",
    category: "Backend",
    description: "Become a backend expert with Node.js and Express.",
  },
  {
    id: 3,
    title: "MongoDB Essentials",
    instructor: "Asif Alam",
    price: "$40",
    category: "Database",
    description: "Learn database design and queries using MongoDB.",
  },
  {
    id: 4,
    title: "Fullstack MERN Bootcamp",
    instructor: "CourseMaster Team",
    price: "$120",
    category: "Fullstack",
    description: "Build full-featured MERN stack applications.",
  },
];

const Courses = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(""); // priceLowHigh, priceHighLow
  const [filter, setFilter] = useState(""); // category filter

  // Filter & sort courses
  let displayedCourses = dummyCourses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase()) ||
    course.instructor.toLowerCase().includes(search.toLowerCase())
  );

  if (filter) {
    displayedCourses = displayedCourses.filter(
      (course) => course.category === filter
    );
  }

  if (sort === "priceLowHigh") {
    displayedCourses.sort(
      (a, b) => parseInt(a.price.replace("$", "")) - parseInt(b.price.replace("$", ""))
    );
  } else if (sort === "priceHighLow") {
    displayedCourses.sort(
      (a, b) => parseInt(b.price.replace("$", "")) - parseInt(a.price.replace("$", ""))
    );
  }

  return (
    <div className="bg-[#F9FAFB] min-h-screen py-12 px-4">
      <h1 className="text-3xl font-bold text-[#4F46E5] text-center mb-8">All Courses</h1>

      {/* Search, Filter, Sort */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <input
          type="text"
          placeholder="Search by title or instructor..."
          className="px-4 py-2 rounded border border-gray-300 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Database">Database</option>
          <option value="Fullstack">Fullstack</option>
        </select>

        <select
          className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
        </select>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedCourses.map((course) => (
          <div
            key={course.id}
            className="bg-[#FFFFFF] p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold text-[#111827]">{course.title}</h3>
            <p className="text-[#6B7280] mt-1 text-sm">{course.instructor}</p>
            <p className="text-[#111827] font-semibold mt-2">{course.price}</p>
            <p className="text-[#6B7280] mt-2 text-sm">{course.description}</p>
            <p className="text-[#FBBF24] mt-1 text-sm font-semibold">{course.category}</p>
            <Link
              to="/login"
              className="mt-4 inline-block bg-[#4F46E5] text-white px-4 py-2 rounded hover:bg-[#3B82F6] transition"
            >
              Enroll Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
