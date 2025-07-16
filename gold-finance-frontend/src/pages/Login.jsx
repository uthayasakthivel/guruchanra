import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../auth/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/ToastContext";
import GoogleLoginButton from "../components/GoogleLoginButton";
import AuthPageLayout from "../components/AuthPageLayout";
import loginImage from "../assets/loginImage.png";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const { role, approved } = docSnap.data();

        if (!approved) {
          showToast("Your account is pending admin approval.", "error");
          navigate("/", { replace: true });
          return;
        }

        showToast("Login successful!", "success");

        if (role === "admin") {
          navigate("/admin", { replace: true });
        } else if (role === "employee") {
          navigate("/employee", { replace: true });
        } else {
          showToast("No role assigned. Contact support.", "error");
          navigate("/", { replace: true });
        }
      } else {
        showToast("User data not found. Contact support.", "error");
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("Login error:", error.code, error.message);
      switch (error.code) {
        case "auth/user-not-found":
          showToast("No account found with this email.", "error");
          break;
        case "auth/wrong-password":
          showToast("Incorrect password.", "error");
          break;
        case "auth/invalid-email":
          showToast("Invalid email address.", "error");
          break;
        case "auth/invalid-credential":
          showToast("Invalid email or password.", "error");
          break;
        case "auth/too-many-requests":
          showToast(
            "Too many login attempts. Please wait a few minutes.",
            "error"
          );
          break;
        default:
          showToast("Login failed: " + error.message, "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <AuthPageLayout title="Login" image={loginImage}>
          <input
            type="email"
            className="border p-2 w-full rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="border p-2 w-full rounded pr-10"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-gray-600 hover:text-gray-900"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button
            type="submit"
            className={`bg-blue-600 text-white px-4 py-2 w-full rounded flex justify-center items-center gap-2 hover:bg-blue-700 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : (
              "Login"
            )}
          </button>

          <div className="text-center mt-4">
            <p>
              New user?{" "}
              <button
                type="button"
                className="text-blue-600 underline hover:text-blue-800"
                onClick={() => navigate("/signup")}
              >
                Register here
              </button>
            </p>
            <p
              className="text-sm mt-4 text-blue-600 hover:underline cursor-pointer"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </p>
            <GoogleLoginButton />
          </div>
        </AuthPageLayout>
      </form>
    </>
  );
}
