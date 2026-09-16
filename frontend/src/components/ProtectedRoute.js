import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { userInfo } = useAuth();

  if (!userInfo) return <Navigate to="/login" replace />;
  if (adminOnly && userInfo.role !== "admin") return <Navigate to="/" replace />;

  return children;
}
