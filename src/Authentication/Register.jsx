import { useState, useContext } from "react";
import { AuthContext } from "../Provider/Context";

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
        // If Firebase registration successful, save user in MongoDB
        const userData = { name, email, password }; // password will be hashed in backend

        const res = await fetch("http://localhost:5000/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });

        const data = await res.json();

        if (data.success) {
          alert("Registration Successful!");
          window.location.href = "/login";
        } else {
          alert(data.message || "Registration failed!");
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
      <div className="bg-[#FFFFFF] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-[#4F46E5] mb-6 text-center">
          Register
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-[#111827] mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block text-[#111827] mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-[#111827] mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#4F46E5] text-white font-semibold rounded-md hover:bg-[#3B82F6] transition-colors"
          >
            Register
          </button>
        </form>
        <p className="text-[#6B7280] mt-4 text-center text-sm">
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
