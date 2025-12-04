import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

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
    lessons: [""],
    assignments: [{ title: "", description: "", link: "" }],
  });

  useEffect(() => {
    fetch(`https://course-master-server.onrender.com/course/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.course) {
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
            lessons: data.course.lessons.length ? data.course.lessons : [""],
            assignments: data.course.assignments.length
              ? data.course.assignments
              : [{ title: "", description: "", link: "" }],
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLessonChange = (index, value) => {
    const newLessons = [...formData.lessons];
    newLessons[index] = value;
    setFormData({ ...formData, lessons: newLessons });
  };

  const handleAddLesson = () => {
    setFormData({ ...formData, lessons: [...formData.lessons, ""] });
  };

  const handleRemoveLesson = (index) => {
    if (formData.lessons.length > 1) {
      const newLessons = formData.lessons.filter((_, i) => i !== index);
      setFormData({ ...formData, lessons: newLessons });
    } else {
      Swal.fire("Error", "Minimum 1 lesson required", "warning");
    }
  };

  const handleAssignmentChange = (index, field, value) => {
    const newAssignments = [...formData.assignments];
    newAssignments[index][field] = value;
    setFormData({ ...formData, assignments: newAssignments });
  };

  const handleAddAssignment = () => {
    setFormData({
      ...formData,
      assignments: [
        ...formData.assignments,
        { title: "", description: "", link: "" },
      ],
    });
  };

  const handleRemoveAssignment = (index) => {
    if (formData.assignments.length > 1) {
      const newAssignments = formData.assignments.filter((_, i) => i !== index);
      setFormData({ ...formData, assignments: newAssignments });
    } else {
      Swal.fire("Error", "Minimum 1 assignment required", "warning");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.lessons.length < 1) {
      return Swal.fire("Error", "Minimum 1 lesson required", "warning");
    }
    if (formData.assignments.length < 1) {
      return Swal.fire("Error", "Minimum 1 assignment required", "warning");
    }

    fetch(`https://course-master-server.onrender.com/course/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "Course updated successfully!",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => navigate("/admindashboard/coursemanage"));
        } else {
          Swal.fire("Error", "Update failed!", "error");
        }
      })
      .catch((err) => console.error(err));
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 md:p-8 bg-white rounded shadow mt-6 md:mt-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        Update Course
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {[
          "title",
          "description",
          "instructor",
          "price",
          "category",
          "syllabus",
          "batch",
          "thumbnail",
        ].map((key) => (
          <div key={key} className="flex flex-col">
            <label className="font-semibold mb-1">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <input
              type={key === "price" ? "number" : "text"}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>
        ))}

        {/* Lessons */}
        <div className="space-y-2">
          <label className="font-semibold">Lessons (Video URLs)</label>
          {formData.lessons.map((lesson, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row gap-2 items-start sm:items-center"
            >
              <input
                type="text"
                value={lesson}
                onChange={(e) => handleLessonChange(index, e.target.value)}
                required
                className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => handleRemoveLesson(index)}
                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition mt-2 sm:mt-0"
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

        {/* Assignments */}
        <div className="space-y-2">
          <label className="font-semibold">Assignments</label>
          {formData.assignments.map((assn, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row gap-2 items-start sm:items-center"
            >
              <input
                type="text"
                placeholder="Title"
                value={assn.title}
                onChange={(e) =>
                  handleAssignmentChange(index, "title", e.target.value)
                }
                required
                className="border px-2 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Description"
                value={assn.description}
                onChange={(e) =>
                  handleAssignmentChange(index, "description", e.target.value)
                }
                required
                className="border px-2 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Google Sheet / PDF Link"
                value={assn.link}
                onChange={(e) =>
                  handleAssignmentChange(index, "link", e.target.value)
                }
                className="border px-2 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => handleRemoveAssignment(index)}
                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition mt-2 sm:mt-0"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddAssignment}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition mt-2"
          >
            Add Assignment
          </button>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mt-4 w-full sm:w-auto"
        >
          Update Course
        </button>
      </form>
    </div>
  );
};

export default AdminCourseUpdate;
