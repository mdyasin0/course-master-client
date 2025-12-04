import { useParams } from "react-router";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Provider/Context";
import Swal from "sweetalert2";

const CourseDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState("Bkash");
  const [txnId, setTxnId] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetch(`https://course-master-server.onrender.com/course/${id}`)
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

  const handleEnrollClick = async () => {
    if (!user) {
      Swal.fire("Login Required", "Please login first to enroll!", "warning");
      return;
    }

    try {
      const checkRes = await fetch(
        `https://course-master-server.onrender.com/check-enrollment?email=${user.email}&courseId=${id}`
      );

      const data = await checkRes.json();

      if (data.exists) {
        Swal.fire(
          "Already Enrolled",
          "You have already enrolled in this course!",
          "info"
        );
        return;
      }
    } catch (err) {
      console.error("Enrollment check failed:", err);
      Swal.fire("Error", "Could not check enrollment. Try again.", "error");
      return;
    }

    setStep(1);
    setShowModal(true);
  };

  const handleNext = () => {
    if (!phone) {
      Swal.fire("Input Required", "Please enter your phone number", "warning");
      return;
    }
    setStep(2);
  };

  const handleSubmitPayment = async () => {
    if (!txnId) {
      Swal.fire("Input Required", "Please enter transaction ID", "warning");
      return;
    }

    const confirmed = await Swal.fire({
      title: "Confirm Submission",
      text: "Are you sure everything is 100% correct?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, submit",
    });

    if (!confirmed.isConfirmed) return;

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
      status: "pending",
      courseStatus: "pending",
      assignmentStatus: "pending",
    };

    try {
      const res = await fetch(
        "https://course-master-server.onrender.com/enroll/manual",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (res.status === 201) {
        Swal.fire(
          "Enrollment Submitted",
          "Waiting for admin approval.",
          "success"
        );
        setShowModal(false);
        setPhone("");
        setTxnId("");
        setMethod("Bkash");
      } else {
        Swal.fire("Error", data.message || "Something went wrong", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setProcessing(false);
    }
  };

  // Loading Spinner
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );

  if (!course)
    return <p className="text-center text-red-500">Course not found</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-full flex justify-center md:justify-start">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="rounded-xl shadow-lg w-full max-w-md md:max-w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">{course.title}</h1>
          <p className="text-gray-700 text-sm md:text-base">
            {course.description}
          </p>

          <div className="space-y-2 text-sm md:text-lg">
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
              {course.lessons?.length || 0}
            </p>
            <p>
              <span className="font-semibold">Total assignments:</span>{" "}
              {course.assignments?.length || 0}
            </p>
          </div>

          <button
            onClick={handleEnrollClick}
            className="mt-4 inline-block bg-[#4F46E5] text-white px-6 py-3 rounded-md hover:bg-[#3B82F6] transition text-sm md:text-base"
          >
            Enroll Now
          </button>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Syllabus</h2>
        <p className="text-gray-700 bg-gray-100 p-4 rounded-lg shadow text-sm md:text-base">
          {course.syllabus}
        </p>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-sm max-h-[90vh] overflow-y-auto">
            {step === 1 && (
              <>
                <h3 className="text-xl md:text-2xl font-semibold mb-4">
                  Enter Your Number
                </h3>

                <input
                  type="tel"
                  placeholder="Phone Number you will pay from"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm md:text-base"
                />

                <div className="flex flex-col sm:flex-row justify-end sm:space-x-2 space-y-2 sm:space-y-0">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition text-sm md:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleNext}
                    className="px-4 py-2 bg-[#4F46E5] text-white rounded-md hover:bg-[#3B82F6] transition text-sm md:text-base"
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h3 className="text-xl md:text-2xl font-semibold mb-4">
                  Payment Details
                </h3>

                <p className="text-sm md:text-base">
                  Send money to: <strong>017XXXXXXXX</strong>
                </p>

                <div className="mb-2">
                  <label className="block mb-1 text-sm md:text-base">
                    Payment Method
                  </label>
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm md:text-base"
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
                  className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm md:text-base"
                />

                <div className="flex flex-col sm:flex-row justify-end sm:space-x-2 space-y-2 sm:space-y-0">
                  <button
                    onClick={() => setStep(1)}
                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition text-sm md:text-base"
                  >
                    Back
                  </button>

                  <button
                    onClick={handleSubmitPayment}
                    disabled={processing}
                    className="px-4 py-2 bg-[#4F46E5] text-white rounded-md hover:bg-[#3B82F6] transition text-sm md:text-base"
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
