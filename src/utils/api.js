import axios from "axios";

// ✅ Base API
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ✅ Add token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("ra_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ==========================
// 🔐 AUTH APIs
// ==========================
export const registerUser = (data) => API.post("/auth/register", data);

export const loginUser = (data) => API.post("/auth/login", data);

export const getMe = () => API.get("/auth/me");

// ==========================
// 🤖 ANALYZE API
// ==========================
export const analyzeResume = (formData) =>
  API.post("/analyze", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// ==========================
// 📊 HISTORY (future use)
// ==========================
export const getHistory = () => API.get("/history");