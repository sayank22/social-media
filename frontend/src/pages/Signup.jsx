import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/userApi";
import { toast } from "react-toastify";
import { AuthContext } from "../store/AuthContext"; // Your context path
import { useContext } from "react";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // ⬅️ access login if you want to auto-login later

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup({ name, email, password });

      toast.success("✅ Signup successful! Please login.");
      // Option 1: Navigate to login screen
      setTimeout(() => navigate("/login"), 2000);

      // Option 2: Auto-login after signup (uncomment if needed)
      // login(response.data.user);
      // navigate("/");

    } catch (error) {
      toast.error("❌ Signup failed: " + (error.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Signup</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
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
        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <button type="submit"
      className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
        Signup
        </button>
    </form>
  );
}

export default Signup;
