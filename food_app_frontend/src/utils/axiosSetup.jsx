import axios from "axios";

// Load base URL from .env
const BASE_URL = import.meta.env.VITE_BASE_URL;

// Create the Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = "/login"; // auto-redirect on auth failure
      } else if (error.response.status === 500) {
        console.error("Server error:", error.response.data.message);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
