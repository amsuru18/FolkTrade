import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";
import { FiEye, FiEyeOff, FiMail, FiLock, FiLogIn } from "react-icons/fi";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      const res = await axios.post("/api/auth/login", { email, password });

      toast.success("Logged in successfully!");

      // Save user and token from backend response
      login({
        id: res.data.user.id,
        fullName: res.data.user.fullName,
        email: res.data.user.email,
        token: res.data.token,
      });

      navigate("/home");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-6 border rounded-3xl shadow-xl bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <h2 className="text-2xl font-extrabold mb-6 text-blue-900 dark:text-purple-200 flex items-center gap-2">
        <FiLogIn className="text-blue-400 dark:text-purple-400" /> Login
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-blue-400 dark:from-purple-700 dark:to-purple-500 text-white p-2 rounded-full font-bold shadow hover:scale-105 transition-all"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-blue-500 dark:text-purple-300 underline font-semibold"
        >
          Sign up here
        </Link>
      </p>
    </div>
  );
}
