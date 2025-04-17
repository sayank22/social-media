import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/userApi";
import { toast } from "react-toastify";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      const { token } = response.data;

      // Save token to localStorage (or cookies if you prefer)
      localStorage.setItem("token", token);
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      

      toast.success("✅ Login successful!");

      

      // Redirect user
      

      const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
      localStorage.removeItem("redirectAfterLogin");
      
      console.log("✅ redirectAfterLogin in localStorage:", localStorage.getItem("redirectAfterLogin"));
      console.log("🔐 Token:", localStorage.getItem("token"));
      console.log("🔓 isLoggedIn:", localStorage.getItem("isLoggedIn"));
      

      navigate(redirectPath, { replace: true });

    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      toast.error("❌ Login failed: " + (error.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
