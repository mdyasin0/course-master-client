import { createBrowserRouter } from "react-router";
import App from "../App";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import Home from "../Pages/Home";
import Courses from "../Pages/Course";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/home",
        element: <Home />,
      },{
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
