import { useState, useContext } from "react";
import { auth } from "../Firebase/Firebase.config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/Context";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);

      Swal.fire({
        icon: "success",
        title: "Login successful!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      const name = firebaseUser.displayName || "No Name";
      const email = firebaseUser.email;

      const res = await fetch(
        "https://course-master-server.onrender.com/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            password: "google-login",
            role: "student",
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Google login successful!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      } else {
        Swal.fire({
          icon: "info",
          title: "Welcome back!",
          text: "Login successful!",
        });
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] px-4">
      <div className="bg-[#FFFFFF] p-8 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-md lg:max-w-md xl:max-w-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#4F46E5] mb-6 text-center">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[#111827] mb-1 text-sm sm:text-base">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm sm:text-base"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-[#111827] mb-1 text-sm sm:text-base">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm sm:text-base"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#4F46E5] text-white font-semibold rounded-md hover:bg-[#3B82F6] transition-colors text-sm sm:text-base"
          >
            Login
          </button>
        </form>

        <p className="text-gray-400 text-center py-2 text-sm sm:text-base">
          OR
        </p>

        <button
          onClick={handleGoogleLogin}
          className="w-full py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors text-sm sm:text-base"
        >
          Continue with Google
        </button>

        <p className="text-[#6B7280] mt-4 text-center text-xs sm:text-sm">
          Don't have an account?{" "}
          <a href="/register" className="text-[#4F46E5] hover:text-[#3B82F6]">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
