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
import ProtectedRoute from "../Provider/ProtectedRoute";
import AdminEnrollments from "../Dashboard/Admin/AdminEnrollments";



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
      path: "/coursedetails/:id" ,
      element:  (
        <ProtectedRoute>
<CourseDetails/>
        </ProtectedRoute>
      )  ,
      },
      {
         path: "/studentdashboard" ,
         element: <StudentDashboardLayout/> ,
      },{
       path: "/admindashboard" ,
       element: <AdminDashboard/> ,
       children: [
        {
            path: "/admindashboard/coursecreate" ,
            element: <CourseCreate/> ,
        },{
          path:"/admindashboard/coursemanage" ,
          element: <CourseManage/> ,
        },{
          path: "/admindashboard/admincoursedetails/:id",
          element: <AdminCourseDetails/> ,
        },{
          path:"/admindashboard/Admincourseupdate/:id" ,
          element: <AdminCourseUpdate/> ,
        },{
         path: "/admindashboard/adminenrollments" ,
         element: <AdminEnrollments/> ,
        }
       ]
      },
      {
        path: "/courses",
        element: <Courses/> ,
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
