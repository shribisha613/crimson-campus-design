import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom"; // ← Import this

export default function LoginPage() {
  const navigate = useNavigate(); // ← Initialize
  const [role, setRole] = useState<"student" | "staff">("student");
  const [pendingRole, setPendingRole] = useState<"student" | "staff">(
    "student"
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [staffCredentials, setStaffCredentials] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); // ← Added remember me

  // Check localStorage on mount
  useEffect(() => {
    const rememberedUsername = localStorage.getItem("rememberedUsername");
    const rememberedPassword = localStorage.getItem("rememberedPassword");
    const remembered = localStorage.getItem("rememberMe") === "true";

    if (remembered && rememberedUsername && rememberedPassword) {
      setStaffCredentials({
        username: rememberedUsername,
        password: rememberedPassword,
      });
      setRememberMe(true);
    }
  }, []);

  const switchRole = (newRole: "student" | "staff") => {
    if (newRole === role) return;
    setPendingRole(newRole);
    setIsAnimating(true);
  };

  useEffect(() => {
    if (isAnimating) {
      const timeout = setTimeout(() => {
        setRole(pendingRole);
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isAnimating, pendingRole]);

  const handleStaffLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Save credentials if "Remember Me" is checked
    if (rememberMe) {
      localStorage.setItem("rememberedUsername", staffCredentials.username);
      localStorage.setItem("rememberedPassword", staffCredentials.password);
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("rememberedUsername");
      localStorage.removeItem("rememberedPassword");
      localStorage.setItem("rememberMe", "false");
    }

    // Navigate to dashboard
    navigate("/dashboard");
  };

  const handleGoogleLogin = () => {
    alert("Redirecting to Google login... (mock)");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-white font-serif text-gray-800">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl rounded-3xl p-10 sm:p-8 space-y-8 transition-all duration-300">
        {/* Role Selector Tabs */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <button
            onClick={() => switchRole("student")}
            className={`px-6 py-3 text-lg rounded-l-2xl font-semibold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-black ${
              role === "student" && !isAnimating
                ? "bg-black text-white shadow-md scale-105"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
            aria-pressed={role === "student"}
          >
            Student
          </button>
          <button
            onClick={() => switchRole("staff")}
            className={`px-6 py-3 text-lg rounded-r-2xl font-semibold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-black ${
              role === "staff" && !isAnimating
                ? "bg-black text-white shadow-md scale-105"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
            aria-pressed={role === "staff"}
          >
            Staff
          </button>
        </div>

        {/* Login Forms */}
        <div
          className={`transition-opacity duration-300 ease-in-out ${
            isAnimating ? "opacity-0" : "opacity-100"
          }`}
          key={role}
        >
          {role === "student" ? (
            <div className="space-y-6">
              <button
                onClick={handleGoogleLogin}
                className="w-full py-4 bg-white text-gray-700 border-2 border-gray-300 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition flex items-center justify-center gap-3 text-lg font-medium focus:outline-none focus:ring-4 focus:ring-gray-400"
                aria-label="Continue with Google"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </button>
            </div>
          ) : (
            <form onSubmit={handleStaffLogin} className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={staffCredentials.username}
                  onChange={(e) =>
                    setStaffCredentials({
                      ...staffCredentials,
                      username: e.target.value,
                    })
                  }
                  placeholder="Enter your username"
                  required
                  className="w-full px-5 py-3 bg-gray-50 border-2 border-gray-300 rounded-2xl placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-300 focus:bg-white transition text-base"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={staffCredentials.password}
                    onChange={(e) =>
                      setStaffCredentials({
                        ...staffCredentials,
                        password: e.target.value,
                      })
                    }
                    placeholder="Enter your password"
                    required
                    className="w-full px-5 py-3 bg-gray-50 border-2 border-gray-300 rounded-2xl placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-300 focus:bg-white transition pr-14 text-base"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded"
                    tabIndex={-1}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-6 h-6" />
                    ) : (
                      <Eye className="w-6 h-6" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center space-x-2">
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-black border-gray-300 rounded focus:ring-2 focus:ring-black"
                />
                <label htmlFor="remember" className="text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-black text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition text-lg"
              >
                Login as Staff
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
