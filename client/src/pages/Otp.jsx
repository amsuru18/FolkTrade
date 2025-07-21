import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { FiShield, FiKey } from "react-icons/fi";

export default function Otp() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login } = useAuth();

  // Only allow access if navigated from signup (location.state.userId)
  useEffect(() => {
    if (!location.state || !location.state.userId) {
      navigate("/login");
    }
  }, [location, navigate]);

  // Get userId from location state
  const userId = location.state?.userId;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("OTP must be 6 digits");
      return;
    }

    try {
      setLoading(true);
      // Use userId from state
      const payload = { otp };
      if (userId) payload.userId = userId;

      // Call backend to verify OTP
      const res = await axios.post("/api/auth/verify-otp", payload);

      toast.success("OTP verified successfully!");
      if (res.data && res.data.user) {
        login({
          id: res.data.user.id,
          fullName: res.data.user.fullName,
          email: res.data.user.email,
          token: user?.token,
        });
      }
      navigate("/home");
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setLoading(true);
      // You may need to update this to send userId if not logged in
      await axios.post("/api/auth/resend-otp", userId ? { userId } : {});

      toast.success("OTP resent to your email!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-6 border rounded-3xl shadow-xl bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <h2 className="text-2xl font-extrabold mb-6 text-blue-900 dark:text-purple-200 flex items-center gap-2">
        <FiShield className="text-blue-400 dark:text-purple-400" /> Verify OTP
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative">
          <FiKey className="absolute left-3 top-3 text-blue-400 dark:text-purple-400" />
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
            }
            className="pl-10 p-2 border rounded w-full bg-white/80 dark:bg-gray-900/80 text-center tracking-widest text-xl focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500"
            maxLength={6}
            autoFocus
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-blue-500 to-blue-400 dark:from-purple-700 dark:to-purple-500 text-white p-2 rounded-full font-bold shadow hover:scale-105 transition-all disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
      <button
        onClick={handleResend}
        disabled={loading}
        className="mt-4 text-blue-600 dark:text-purple-300 underline font-semibold"
      >
        Resend OTP
      </button>
    </div>
  );
}
