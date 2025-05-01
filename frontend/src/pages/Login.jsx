import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { login as apiLogin } from "../api/userApi";
import { toast } from "react-toastify";
import { AuthContext } from "../store/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const showMessage = location.state?.showLoginMessage;

    console.log("Login - showLoginMessage from location.state:", location.state?.showLoginMessage);

    if (showMessage) {
      setLoginMessage("Please login to continue");
      toast.info("🔒 Please login to create a post");
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await apiLogin({ email, password });

      if (response?.data?.token) {
        const { token, user } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        login(user, token);
        toast.success("✅ Login successful!");

        const redirectPath = location.state?.from || "/";

        console.log("Login - Redirecting to:", redirectPath);
        sessionStorage.removeItem("redirectAfterLogin");

        navigate(redirectPath, { replace: true });
      } else {
        throw new Error("Token missing from response.");
      }
    } catch (error) {
      toast.error("❌ Login failed: " + (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

      {loginMessage && (
        <div className="mb-4 p-3 text-sm bg-yellow-100 text-yellow-800 border border-yellow-400 rounded-md text-center">
          {loginMessage}
        </div>
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />

      <button
        type="submit"
        className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

export default Login;
