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
    if (!user) return;

    fetch(`http://localhost:5000/enrollments/user/${user.email}`)
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
    return <p className="text-center text-xl text-[#111827]">Loading...</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Enrollments */}
        <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center">
          <p className="text-[#111827] text-lg font-semibold mb-2">
            Total Enrollments
          </p>
          <p className="text-[#4F46E5] text-3xl font-bold">{stats.total}</p>
        </div>

        {/* Pending */}
        <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center">
          <p className="text-[#111827] text-lg font-semibold mb-2">Pending</p>
          <p className="text-[#FBBF24] text-3xl font-bold">{stats.pending}</p>
        </div>

        {/* Approved */}
        <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center">
          <p className="text-[#111827] text-lg font-semibold mb-2">Approved</p>
          <p className="text-[#3B82F6] text-3xl font-bold">{stats.approved}</p>
        </div>

        {/* Blocked */}
        <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center">
          <p className="text-[#111827] text-lg font-semibold mb-2">Blocked</p>
          <p className="text-[#F87171] text-3xl font-bold">{stats.blocked}</p>
        </div>
      </div>
      <AvailableCourses />
    </div>
  );
};

export default CourseOverview;
