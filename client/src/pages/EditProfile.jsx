import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { FiEye, FiEyeOff, FiUser, FiLock } from "react-icons/fi";

export default function EditProfile() {
  const { user, logout, login } = useAuth();
  const navigate = useNavigate();

  // Form states
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Show/hide password states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!fullName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      // Prepare update data
      const updateData = { fullName };

      if (password) updateData.password = password;

      const token = localStorage.getItem("token");
      if (!token || token === "undefined" || token.length < 10) {
        toast.error("Session expired. Please log in again.");
        logout();
        navigate("/login");
        return;
      }
      // Call backend to update profile (name/password only)
      await axios.put("/api/user/profile", updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border rounded-3xl shadow-xl bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 pb-20">
      <h2 className="text-2xl font-extrabold mb-6 text-blue-900 dark:text-purple-200 flex items-center gap-2">
        <FiUser className="text-blue-400 dark:text-purple-400" /> Edit Profile
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative">
          <FiUser className="absolute left-3 top-3 text-blue-400 dark:text-purple-400" />
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="pl-10 p-2 border rounded w-full bg-white/80 dark:bg-gray-900/80 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500"
          />
        </div>
        <div className="relative">
          <FiLock className="absolute left-3 top-3 text-blue-400 dark:text-purple-400" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password (leave blank if no change)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 p-2 border rounded w-full bg-white/80 dark:bg-gray-900/80 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-600 dark:text-gray-300"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        <div className="relative">
          <FiLock className="absolute left-3 top-3 text-blue-400 dark:text-purple-400" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="pl-10 p-2 border rounded w-full bg-white/80 dark:bg-gray-900/80 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-3 text-gray-600 dark:text-gray-300"
          >
            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-blue-400 dark:from-purple-700 dark:to-purple-500 text-white p-2 rounded-full font-bold shadow hover:scale-105 transition-all"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="bg-red-500 text-white p-2 rounded-full font-bold hover:bg-red-600 transition-all"
        >
          Logout
        </button>
      </form>
    </div>
  );
}
