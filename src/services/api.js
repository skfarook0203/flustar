import axios from 'axios';

const API_BASE = 'https://your-render-backend-url.com/api'; // Replace with actual Render URL

const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
