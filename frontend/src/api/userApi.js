import axios from 'axios';

// Define the base URL for the API
const api = axios.create({ baseURL: 'http://localhost:5000/api/users' });

export const signup = (userData) => {
  return api.post('/signup', userData); // Sends POST request to /signup endpoint
};

export const login = async (userData) => {
  try {
    const res = await api.post('/login', userData);
    console.log("✅ Login response:", res);
    return res;
  } catch (err) {
    console.error("❌ Login error:", err.response?.data || err.message);
    throw err;
  }
};

