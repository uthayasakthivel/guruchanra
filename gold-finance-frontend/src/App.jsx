// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoute from "./routes/PrivateRoute";
import { ToastProvider } from "./components/ToastContext";
import HomePage from "./pages/HomePage"; // import your separate homepage
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import { useEffect, useState } from "react";

import Lottie from "lottie-react";
import loadingSpinner from "./assets/Coin_rotating.json";

function AppRoutes() {
  const { loading: authLoading } = useAuth();
  const [fakeLoading, setFakeLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setFakeLoading(false), 3000);
    return () => clearTimeout(timeout);
  }, []);

  if (authLoading || fakeLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>
          <Lottie
            animationData={loadingSpinner}
            loop={true}
            className="w-40 md:w-60 lg:w-100"
          />
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Dummy homepage at "/" */}
      <Route path="/" element={<HomePage />} />

      {/* Login page */}
      <Route path="/login" element={<Login />} />

      {/* Signup page */}
      <Route path="/signup" element={<SignUp />} />

      {/* Forgot password page */}
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Admin dashboard protected */}
      <Route
        path="/admin"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </PrivateRoute>
        }
      />

      {/* Employee dashboard protected */}
      <Route
        path="/employee"
        element={
          <PrivateRoute allowedRoles={["employee"]}>
            <EmployeeDashboard />
          </PrivateRoute>
        }
      />

      {/* Catch all - redirect unknown routes to homepage */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
