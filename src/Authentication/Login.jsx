import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    
    console.log({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
      <div className="bg-[#FFFFFF] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-[#4F46E5] mb-6 text-center">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
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
            Login
          </button>
        </form>
        <p className="text-[#6B7280] mt-4 text-center text-sm">
          Don't have an account? <a href="/register" className="text-[#4F46E5] hover:text-[#3B82F6]">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
