import { useParams } from "react-router";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Provider/Context";

const CourseDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [step, setStep] = useState(1); // 1 = enter your number, 2 = payment submit
  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState(""); // user's number for sending money
  const [method, setMethod] = useState("Bkash");
  const [txnId, setTxnId] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/course/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data.course);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching course:", err);
        setLoading(false);
      });
  }, [id]);

  const handleEnrollClick = () => {
    if (!user) {
      alert("Please login first to enroll!");
      return;
    }
    setStep(1);
    setShowModal(true);
  };

  const handleNext = () => {
    if (!phone) {
      alert("Please enter your phone number");
      return;
    }
    setStep(2);
  };

  const handleSubmitPayment = async () => {
    if (!txnId) {
      alert("Please enter transaction ID");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure everything is 100% correct?"
    );
    if (!confirmed) return;

    setProcessing(true);

    const payload = {
      courseId: course._id,
      courseTitle: course.title,
      name: user.displayName || user.name,
      email: user.email,
      phone,
      amount: course.price,
      paymentMethod: method,
      transactionId: txnId,
      userId: user.uid,
    };

    try {
      const res = await fetch("http://localhost:5000/enroll/manual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.status === 201) {
        alert("Enrollment submitted! Waiting for admin approval.");
        setShowModal(false);
        setPhone("");
        setTxnId("");
        setMethod("Bkash");
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setProcessing(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
      </div>
    );
  if (!course)
    return <p className="text-center text-red-500">Course not found</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={course.thumbnail}
            alt={course.title}
            className="rounded-xl shadow-lg w-full"
          />
        </div>
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
          <button
            onClick={handleEnrollClick}
            className="mt-4 inline-block bg-[#4F46E5] text-white px-6 py-3 rounded-md hover:bg-[#3B82F6] transition"
          >
            Enroll Now
          </button>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Syllabus</h2>
        <p className="text-gray-700 bg-gray-100 p-4 rounded-lg shadow">
          {course.syllabus}
        </p>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-sm">
            {step === 1 && (
              <>
                <h3 className="text-xl font-semibold mb-4">
                  Enter Your Number
                </h3>
                <input
                  type="tel"
                  placeholder="Phone Number you will pay from"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleNext}
                    className="px-4 py-2 bg-[#4F46E5] text-white rounded-md hover:bg-[#3B82F6] transition"
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
                <p>
                  Send money to: <strong>017XXXXXXXX</strong>
                </p>
                <div className="mb-2">
                  <label className="block mb-1">Payment Method</label>
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                  >
                    <option>Bkash</option>
                    <option>Nagad</option>
                    <option>Rocket</option>
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="Transaction ID"
                  value={txnId}
                  onChange={(e) => setTxnId(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setStep(1)}
                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmitPayment}
                    disabled={processing}
                    className="px-4 py-2 bg-[#4F46E5] text-white rounded-md hover:bg-[#3B82F6] transition"
                  >
                    {processing ? "Processing..." : "Submit"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
