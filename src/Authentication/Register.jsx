import { useState, useContext } from "react";
import { AuthContext } from "../Provider/Context";
import Swal from "sweetalert2";

const Register = () => {
  const { register } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const firebaseUser = await register(email, password);

      if (firebaseUser.user.uid) {
        const userData = { name, email, password };

        const res = await fetch(
          "https://course-master-server.onrender.com/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
          }
        );

        const data = await res.json();

        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "Registration Successful!",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location.href = "/login";
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Registration Failed",
            text: data.message || "Registration failed!",
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] px-4">
      <div className="bg-[#FFFFFF] p-8 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-md lg:max-w-md xl:max-w-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#4F46E5] mb-6 text-center">
          Register
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-[#111827] mb-1 text-sm sm:text-base">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm sm:text-base"
              placeholder="Enter your name"
              required
            />
          </div>
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
            Register
          </button>
        </form>
        <p className="text-[#6B7280] mt-4 text-center text-xs sm:text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-[#4F46E5] hover:text-[#3B82F6]">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
