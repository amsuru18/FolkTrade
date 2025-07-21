import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const { user } = useAuth();

    if (!user) {
        // Not logged in -> redirect to login
        return <Navigate to="/login" replace />;
    }

    // Logged in -> show the requested page
    return children;
}