// src/routes/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function PrivateRoute({ children, allowedRoles = [] }) {
  const { currentUser, userRole, loading } = useAuth();

  if (loading) return <div>Loading protected route...</div>;

  if (!currentUser) return <Navigate to="/" />;

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return children;
}
