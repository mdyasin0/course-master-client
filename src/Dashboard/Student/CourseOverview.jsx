import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Provider/Context";
import AvailableCourses from "./AvailableCourses";

const CourseOverview = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    blocked: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    fetch(
      `https://course-master-server.onrender.com/enrollments/user/${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStats({
            total: data.total,
            pending: data.pending,
            approved: data.approved,
            blocked: data.blocked,
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl space-x-3">
        <span className="loading loading-bars loading-xs"></span>
        <span className="loading loading-bars loading-sm"></span>
        <span className="loading loading-bars loading-md"></span>
        <span className="loading loading-bars loading-lg"></span>
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
        {/* Total Enrollments */}
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 flex flex-col items-center">
          <p className="text-[#111827] text-base sm:text-lg font-semibold mb-1 sm:mb-2">
            Total Enrollments
          </p>
          <p className="text-[#4F46E5] text-2xl sm:text-3xl font-bold">
            {stats.total}
          </p>
        </div>

        {/* Pending */}
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 flex flex-col items-center">
          <p className="text-[#111827] text-base sm:text-lg font-semibold mb-1 sm:mb-2">
            Pending
          </p>
          <p className="text-[#FBBF24] text-2xl sm:text-3xl font-bold">
            {stats.pending}
          </p>
        </div>

        {/* Approved */}
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 flex flex-col items-center">
          <p className="text-[#111827] text-base sm:text-lg font-semibold mb-1 sm:mb-2">
            Approved
          </p>
          <p className="text-[#3B82F6] text-2xl sm:text-3xl font-bold">
            {stats.approved}
          </p>
        </div>

        {/* Blocked */}
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 flex flex-col items-center">
          <p className="text-[#111827] text-base sm:text-lg font-semibold mb-1 sm:mb-2">
            Blocked
          </p>
          <p className="text-[#F87171] text-2xl sm:text-3xl font-bold">
            {stats.blocked}
          </p>
        </div>
      </div>

      {/* Available Courses Table */}
      <AvailableCourses />
    </div>
  );
};

export default CourseOverview;
