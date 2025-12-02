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
      element: <CourseDetails/> ,
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
