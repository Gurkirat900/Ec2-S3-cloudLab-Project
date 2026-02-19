import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1", // IMPORTANT: we do NOT hardcode EC2 IP => we use relative path, so that it works both in development and production
});

// Automatically attach token if exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
