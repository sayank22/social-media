import axios from 'axios';

// Define the base URL for the API
const api = axios.create({ baseURL: 'https://silentpost-server.onrender.com/api/users' });

export const signup = (userData) => {
  return api.post('/signup', userData); // Sends POST request to /signup endpoint
};

export const login = async (userData) => {
  try {
    const res = await api.post('/login', userData);
    return res;
  } catch (err) {
    throw err;
  }
};

