import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/userApi";
import { toast } from "react-toastify";

function Login({ setIsLoggedIn, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ email, password });

      if (response?.data?.token) {
        const { token, user } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isLoggedIn", "true");

        setIsLoggedIn(true);
        setUser(user);

        toast.success("✅ Login successful!");

        const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
        localStorage.removeItem("redirectAfterLogin");

        console.log("🔐 Token:", token);
        console.log("👤 User:", user);
        console.log("✅ Redirecting to:", redirectPath);

        navigate(redirectPath, { replace: true });
      } else {
        throw new Error("Token missing from response.");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      toast.error("❌ Login failed: " + (error.response?.data?.message || error.message));
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
