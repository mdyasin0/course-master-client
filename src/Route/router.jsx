import { createBrowserRouter } from "react-router";
import App from "../App";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import Home from "../Pages/Home";
import Courses from "../Pages/Course";
import AdminDashboard from "../Dashboard/Admin/Admin_dashboardlayout";
import StudentDashboardLayout from "../Dashboard/Student/Student_dashboard-layout";
import CourseCreate from "../Dashboard/Admin/Create-course";
import CourseDetails from "../Pages/CourseDetails";
import CourseManage from "../Dashboard/Admin/CourseManage";
import AdminCourseDetails from "../Dashboard/Admin/Admincoursedetails";
import AdminCourseUpdate from "../Dashboard/Admin/AdminCourseUpdate";
import AdminEnrollments from "../Dashboard/Admin/AdminEnrollments";
import CourseOverview from "../Dashboard/Student/CourseOverview";
import StudentAssignment from "../Dashboard/Student/StudentAssignment";
import ManageAssignment from "../Dashboard/Admin/ManageAssignment";
import Rolemanage from "../Dashboard/Admin/Rolemanage";
import ProtectedRoute from "../Provider/ProtectedRoute";
import AdminRoute from "../Provider/AdminRoute";
import StudentRoute from "../Provider/StudentRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/coursedetails/:id",
        element: <CourseDetails />,
      },
      {
        path: "/studentdashboard",
        element: (
          <ProtectedRoute>
            <StudentRoute>
              <StudentDashboardLayout />
            </StudentRoute>
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <StudentRoute>
                  <CourseOverview />
                </StudentRoute>
              </ProtectedRoute>
            ),
          },
          {
            path: "/studentdashboard/courseoverview",
            element: (
              <ProtectedRoute>
                <StudentRoute>
                  <CourseOverview />
                </StudentRoute>
              </ProtectedRoute>
            ),
          },
          {
            path: "/studentdashboard/studentassignment",
            element: (
              <ProtectedRoute>
                <StudentRoute>
                  <StudentAssignment />
                </StudentRoute>
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "/admindashboard",
        element: (
          <ProtectedRoute>
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
              <AdminRoute>
                  <CourseManage />
                </AdminRoute>
              </ProtectedRoute>
            ),
          },
          {
            path: "/admindashboard/coursecreate",
            element: (
              <ProtectedRoute>
                <AdminRoute>
                  <CourseCreate />
                </AdminRoute>
              </ProtectedRoute>
            ),
          },
          {
            path: "/admindashboard/coursemanage",
            element: (
              <ProtectedRoute>
                <AdminRoute>
                  <CourseManage />
                </AdminRoute>
              </ProtectedRoute>
            ),
          },
          {
            path: "/admindashboard/admincoursedetails/:id",
            element: (
              <ProtectedRoute>
                <AdminRoute>
                  <AdminCourseDetails />
                </AdminRoute>
              </ProtectedRoute>
            ),
          },
          {
            path: "/admindashboard/Admincourseupdate/:id",
            element: (
              <ProtectedRoute>
                <AdminRoute>
                  <AdminCourseUpdate />
                </AdminRoute>
              </ProtectedRoute>
            ),
          },
          {
            path: "/admindashboard/adminenrollments",
            element: (
              <ProtectedRoute>
                <AdminRoute>
                  <AdminEnrollments />
                </AdminRoute>
              </ProtectedRoute>
            ),
          },
          {
            path: "/admindashboard/manageassignment",
            element: (
              <ProtectedRoute>
                <AdminRoute>
                  <ManageAssignment />
                </AdminRoute>
              </ProtectedRoute>
            ),
          },
          {
            path: "/admindashboard/rolemanage",
            element: (
              <ProtectedRoute>
                <AdminRoute>
                  <Rolemanage />
                </AdminRoute>
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
