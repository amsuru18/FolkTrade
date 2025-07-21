import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import SellForm from "./pages/SellForm";
import EditProfile from "./pages/EditProfile";
import Otp from "./pages/Otp";
import MyProducts from "./pages/MyProducts";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import { useAuth } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

function AppContent() {
  const { user } = useAuth();
  const location = useLocation();

  // Routes where Navbar/Footer should NOT be shown
  const publicPaths = ["/login", "/signup", "/otp"];

  // Show Navbar/Footer only if user logged in and NOT on public paths (supports dynamic segments)
  const showNavFooter =
    user && !publicPaths.some((path) => location.pathname.startsWith(path));

  return (
    <>
      {showNavFooter && <Navbar />}
      <div className={showNavFooter ? "pt-16" : ""}>
        <Routes>
          {/* Redirect root '/' depending on login */}
          <Route
            path="/"
            element={user ? <Navigate to="/home" /> : <Navigate to="/login" />}
          />

          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="*" element={<NotFound />} />

          {/* Protected routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProtectedRoute>
                <ProductDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sell"
            element={
              <ProtectedRoute>
                <SellForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-products"
            element={
              <ProtectedRoute>
                <MyProducts />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
      <Toaster position="top-center" reverseOrder={false} />
    </Router>
  );
}
