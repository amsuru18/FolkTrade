import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Load user from localStorage if exists, else null
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // OTP state for OTP verification process
  const [otp, setOtp] = useState(null);
  const [otpEmail, setOtpEmail] = useState("");

  // Persist user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Login: set user and save to localStorage
  const login = (userData) => {
    setUser(userData);
    if (
      userData.token &&
      typeof userData.token === "string" &&
      userData.token.split(".").length === 3
    ) {
      localStorage.setItem("token", userData.token);
    } else {
      localStorage.removeItem("token");
    }
  };

  // Logout: clear user and OTP info
  const logout = () => {
    setUser(null);
    setOtp(null);
    setOtpEmail("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // Update user info (e.g. profile updates)
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  // Generate OTP for a given email (simulate)
  const generateOtp = (email) => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(newOtp);
    setOtpEmail(email);
  };

  // Verify entered OTP matches stored OTP
  const verifyOtp = (inputOtp) => {
    return inputOtp === otp;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser,
        generateOtp,
        verifyOtp,
        otpEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
