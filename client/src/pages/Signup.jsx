import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";
import {
  FiEye,
  FiEyeOff,
  FiMail,
  FiLock,
  FiUserPlus,
  FiUser,
} from "react-icons/fi";

export default function Signup() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirm) {
      toast.error("Please fill all fields");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("/api/auth/signup", {
        fullName,
        email,
        password,
      });

      toast.success("Signed up! Please verify OTP sent to your email.");
      // Navigate to OTP verification page with userId
      navigate("/otp", { state: { userId: res.data.userId } });
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-6 border rounded-3xl shadow-xl bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <h2 className="text-2xl font-extrabold mb-6 text-blue-900 dark:text-purple-200 flex items-center gap-2">
        <FiUserPlus className="text-blue-400 dark:text-purple-400" /> Sign Up
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative">
          <FiUser className="absolute left-3 top-3 text-blue-400 dark:text-purple-400" />
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="pl-10 p-2 border rounded w-full bg-white/80 dark:bg-gray-900/80 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500"
          />
        </div>
        <div className="relative">
          <FiMail className="absolute left-3 top-3 text-blue-400 dark:text-purple-400" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 p-2 border rounded w-full bg-white/80 dark:bg-gray-900/80 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500"
          />
        </div>
        <div className="relative">
          <FiLock className="absolute left-3 top-3 text-blue-400 dark:text-purple-400" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 p-2 border rounded w-full bg-white/80 dark:bg-gray-900/80 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 cursor-pointer text-gray-500 dark:text-gray-300"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>
        <div className="relative">
          <FiLock className="absolute left-3 top-3 text-blue-400 dark:text-purple-400" />
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="pl-10 p-2 border rounded w-full bg-white/80 dark:bg-gray-900/80 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500"
          />
          <span
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-3 cursor-pointer text-gray-500 dark:text-gray-300"
            aria-label={
              showConfirm ? "Hide confirm password" : "Show confirm password"
            }
          >
            {showConfirm ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-blue-400 dark:from-purple-700 dark:to-purple-500 text-white p-2 rounded-full font-bold shadow hover:scale-105 transition-all"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-500 dark:text-purple-300 underline font-semibold"
        >
          Login here
        </Link>
      </p>
    </div>
  );
}
