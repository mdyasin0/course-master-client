import { useState, useContext } from "react";
import { auth } from "../Firebase/Firebase.config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/Context";

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
      alert("Login successful!");
     navigate(from, { replace: true }); 
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };
  
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("Google login successful!");
      navigate(from, { replace: true }); 
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
      <div className="bg-[#FFFFFF] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-[#4F46E5] mb-6 text-center">
          Login
        </h2>

        {/* Email & Password Login */}
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

    
          <p className=" text-gray-400 text-center py-2">OR</p>
          
        

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors"
        >
          Continue with Google
        </button>

        <p className="text-[#6B7280] mt-4 text-center text-sm">
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
