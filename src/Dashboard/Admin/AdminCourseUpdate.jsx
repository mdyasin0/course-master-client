import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";

const AdminCourseUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructor: "",
    price: "",
    category: "",
    syllabus: "",
    batch: "",
    thumbnail: "",
    lessons: [],
  });

  useEffect(() => {
    fetch(`http://localhost:5000/course/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data.course);
        setFormData({
          title: data.course.title,
          description: data.course.description,
          instructor: data.course.instructor,
          price: data.course.price,
          category: data.course.category,
          syllabus: data.course.syllabus,
          batch: data.course.batch,
          thumbnail: data.course.thumbnail,
          lessons: data.course.lessons,
        });
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Lesson handle
  const handleLessonChange = (index, value) => {
    const newLessons = [...formData.lessons];
    newLessons[index] = value;
    setFormData({ ...formData, lessons: newLessons });
  };

  const handleAddLesson = () => {
    setFormData({ ...formData, lessons: [...formData.lessons, ""] });
  };

  const handleRemoveLesson = (index) => {
    const newLessons = formData.lessons.filter((_, i) => i !== index);
    setFormData({ ...formData, lessons: newLessons });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/course/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Course updated successfully!");
          navigate("/admindashboard/coursemanage");
        } else {
          alert("Update failed!");
        }
      })
      .catch((err) => console.error(err));
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6">Update Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Normal Fields */}
        {["title","description","instructor","price","category","syllabus","batch","thumbnail"].map((key) => (
          <div key={key} className="flex flex-col">
            <label className="font-semibold">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
            <input
              type={key === "price" ? "number" : "text"}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        {/* Lessons */}
        <div className="space-y-2">
          <label className="font-semibold">Lessons</label>
          {formData.lessons.map((lesson, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                value={lesson}
                onChange={(e) => handleLessonChange(index, e.target.value)}
                className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => handleRemoveLesson(index)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddLesson}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition mt-2"
          >
            Add Lesson
          </button>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mt-4"
        >
          Update Course
        </button>
      </form>
    </div>
  );
};

export default AdminCourseUpdate;
