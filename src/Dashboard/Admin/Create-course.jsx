import  { useState } from "react";

const CourseCreate = () => {
  const [course, setCourse] = useState({
    title: "",
    description: "",
    instructor: "",
    price: "",
    category: "",
    syllabus: "",
    batch: "",
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [videoLinks, setVideoLinks] = useState([""]);
  const [assignments, setAssignments] = useState([
    { title: "", description: "", link: "" },
  ]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  // ---------------- Video Handlers ----------------
  const addMoreVideo = () => setVideoLinks([...videoLinks, ""]);

  const handleVideoChange = (i, value) => {
    const updated = [...videoLinks];
    updated[i] = value;
    setVideoLinks(updated);
  };

  const removeVideo = (i) => {
    if (videoLinks.length > 1) {
      const updated = videoLinks.filter((_, index) => index !== i);
      setVideoLinks(updated);
    } else {
      alert("At least one video is required!");
    }
  };

  // ---------------- Assignment Handlers ----------------
  const addMoreAssignment = () =>
    setAssignments([...assignments, { title: "", description: "", link: "" }]);

  const handleAssignmentChange = (index, field, value) => {
    const updated = [...assignments];
    updated[index][field] = value;
    setAssignments(updated);
  };

  const removeAssignment = (i) => {
    if (assignments.length > 1) {
      const updated = assignments.filter((_, index) => index !== i);
      setAssignments(updated);
    } else {
      alert("At least one assignment is required!");
    }
  };

  // ---------------- Thumbnail Upload ----------------
  const uploadThumbnailToImgBB = async () => {
    const formData = new FormData();
    formData.append("image", thumbnail);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=c0c2b847b1b59290ac14668dd140a262`,
      { method: "POST", body: formData }
    );
    const data = await res.json();
    return data.data.url;
  };

  // ---------------- Form Submit ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let thumbnailUrl = "";
      if (thumbnail) thumbnailUrl = await uploadThumbnailToImgBB();

      const finalCourseData = {
        ...course,
        thumbnail: thumbnailUrl,
        lessons: videoLinks,
        assignments,
      };

      const res = await fetch("http://localhost:5000/create-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalCourseData),
      });

      const data = await res.json();
      if (data.success) alert("Course created successfully!");
      else alert("Failed to create course!");
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }

    setLoading(false);
    setCourse({
      title: "",
      description: "",
      instructor: "",
      price: "",
      category: "",
      syllabus: "",
      batch: "",
    });
    setThumbnail(null);
    setVideoLinks([""]);
    setAssignments([{ title: "", description: "", link: "" }]);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded mt-8">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">
        Create New Course
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Thumbnail */}
        <div>
          <label className="block font-medium mb-1">Course Thumbnail</label>
          <input
            type="file"
            onChange={(e) => setThumbnail(e.target.files[0])}
            className="border rounded w-full px-3 py-2"
            required
          />
        </div>

        {/* Course Title */}
        <div>
          <label className="block font-medium mb-1">Course Title</label>
          <input
            type="text"
            name="title"
            value={course.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={course.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={3}
            required
          />
        </div>

        {/* Instructor */}
        <div>
          <label className="block font-medium mb-1">Instructor</label>
          <input
            type="text"
            name="instructor"
            value={course.instructor}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Price + Category */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={course.price}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Category</label>
            <input
              type="text"
              name="category"
              value={course.category}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
        </div>

        {/* Syllabus */}
        <div>
          <label className="block font-medium mb-1">Syllabus</label>
          <textarea
            name="syllabus"
            value={course.syllabus}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={3}
            required
          />
        </div>

        {/* Batch */}
        <div>
          <label className="block font-medium mb-1">Batch</label>
          <input
            type="text"
            name="batch"
            value={course.batch}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Video Lessons */}
        <div>
          <label className="block font-medium mb-2">Video Lessons</label>
          {videoLinks.map((link, i) => (
            <div key={i} className="flex gap-2 mb-2 items-center">
              <input
                type="text"
                value={link}
                onChange={(e) => handleVideoChange(i, e.target.value)}
                className="border rounded px-3 py-2 w-full"
                placeholder={`Lesson ${i + 1} video link`}
                required
              />
              {videoLinks.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeVideo(i)}
                  className="text-red-600 font-bold px-2"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addMoreVideo}
            className="bg-green-600 text-white px-4 py-1 rounded"
          >
            + Add More
          </button>
        </div>

        {/* Assignments */}
        <div>
          <label className="block font-medium mb-2">Assignments</label>
          {assignments.map((assn, i) => (
            <div key={i} className="border p-3 mb-3 rounded relative">
              <h4 className="font-semibold mb-2">Assignment {i + 1}</h4>
              <input
                type="text"
                value={assn.title}
                onChange={(e) =>
                  handleAssignmentChange(i, "title", e.target.value)
                }
                placeholder="Title"
                className="w-full border rounded px-3 py-2 mb-2"
                required
              />
              <textarea
                value={assn.description}
                onChange={(e) =>
                  handleAssignmentChange(i, "description", e.target.value)
                }
                placeholder="Description"
                className="w-full border rounded px-3 py-2 mb-2"
                rows={2}
                required
              />
              <input
                type="text"
                value={assn.link}
                onChange={(e) =>
                  handleAssignmentChange(i, "link", e.target.value)
                }
                placeholder="Google Sheet / PDF Link"
                className="w-full border rounded px-3 py-2"
              />
              {assignments.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeAssignment(i)}
                  className="absolute top-2 right-2 text-red-600 font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addMoreAssignment}
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            + Add More Assignment
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-2 rounded mt-3"
        >
          {loading ? "Creating..." : "Create Course"}
        </button>
      </form>
    </div>
  );
};

export default CourseCreate;
