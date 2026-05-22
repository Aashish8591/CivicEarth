import axios from "axios";

const API = axios.create({
  baseURL: "https://civicearth-backend.onrender.com/api"
});

// ✅ Add interceptor here
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // ✅ NEVER send token for ANY auth endpoint
  if (token && !config.url?.includes("auth")) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;