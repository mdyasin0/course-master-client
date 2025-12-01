import { createBrowserRouter } from "react-router";
import App from "../App";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
       {
    path: "/login" ,
    element: <Login/>,
  },
  {
    path: "/register" ,
    element: <Register/> ,
  }
    ]
  },
  
   
]);

export default router ;