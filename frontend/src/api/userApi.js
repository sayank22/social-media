import axios from 'axios';

// Define the base URL for the API
const api = axios.create({ baseURL: 'http://localhost:5000/api/users' });

export const signup = (userData) => {
  return api.post('/signup', userData); // Sends POST request to /signup endpoint
};

export const login = (userData) => {
  return api.post('/login', userData); // Sends POST request to /login endpoint
};
