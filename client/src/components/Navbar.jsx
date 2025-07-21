import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";
import { FiSettings, FiPlusCircle } from "react-icons/fi";
import { FaStore } from "react-icons/fa";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    if (showMenu) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 dark:from-black dark:via-gray-900 dark:to-purple-900 shadow-lg fixed top-0 w-full z-50 transition-colors duration-300">
      <div className="flex items-center gap-3">
        <FaStore className="text-2xl text-blue-900 dark:text-purple-300 drop-shadow" />
        <Link
          to="/home"
          className="font-extrabold text-xl tracking-wide text-blue-900 dark:text-purple-200"
        >
          Folktrade
        </Link>
      </div>
      <div className="flex items-center gap-4 relative">
        <Link
          to="/sell"
          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 dark:bg-purple-700 dark:hover:bg-purple-800 text-white px-3 py-1 rounded-full shadow transition-all"
        >
          <FiPlusCircle className="text-lg" />
          <span className="hidden sm:inline">Sell</span>
        </Link>
        <ThemeToggle />
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="relative p-2 rounded-full hover:bg-blue-100 dark:hover:bg-gray-800 transition-all"
        >
          <FiSettings className="text-xl text-blue-900 dark:text-purple-200" />
        </button>
        {showMenu && (
          <div
            ref={menuRef}
            className="absolute right-0 top-12 bg-white dark:bg-gray-900 shadow-xl rounded-lg text-left min-w-[180px] border border-blue-100 dark:border-gray-700 animate-fade-in z-50"
          >
            <Link
              to="/edit-profile"
              className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
            >
              <span>Edit Profile</span>
            </Link>
            <Link
              to="/my-products"
              className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
            >
              <span>My Products</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
            >
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
