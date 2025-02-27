import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//* Interceptor für Authentifizierung
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const handleRequest = async (request) => {
  try {
    const response = await request();
    return response.data;
  } catch (error) {
    console.error("API Fehler:", error.response?.data || error.message);
    if (error.response?.status === 401) {
      logoutUser(); //* Falls Token abgelaufen oder nicht vorhanden, automatisch ausloggen
    }
    throw error;
  }
};

//* 🔐 Authentifizierung & Login Services
export const loginUser = async (email, password) => {
  const data = await handleRequest(() =>
    api.post("/auth/login", { email, password })
  );
  localStorage.setItem("token", data.token);
  localStorage.setItem("isAdmin", data.isAdmin);
  return data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("isAdmin");
};

export const isAuthenticated = () => !!localStorage.getItem("token");

export const isAdmin = () => localStorage.getItem("isAdmin") === "true";

//* 📰 News Services
export const newsService = {
  create: (data) => handleRequest(() => api.post("/news", data)),
  getAll: () => handleRequest(() => api.get("/news")),
  getById: (id) => handleRequest(() => api.get(`/news/${id}`)),
  update: (id, data) => handleRequest(() => api.put(`/news/${id}`, data)),
  delete: (id) => handleRequest(() => api.delete(`/news/${id}`)),
};

//* 🐾 Adoption Services
export const adoptionService = {
  create: (data) => handleRequest(() => api.post("/adoption", data)),
  getAll: () => handleRequest(() => api.get("/adoption")),
  getById: (id) => handleRequest(() => api.get(`/adoption/${id}`)),
  update: (id, data) => handleRequest(() => api.put(`/adoption/${id}`, data)),
  delete: (id) => handleRequest(() => api.delete(`/adoption/${id}`)),
};

//* 🎉 Event Services
export const eventService = {
  create: (data) => handleRequest(() => api.post("/events", data)),
  getAll: () => handleRequest(() => api.get("/events")),
  getById: (id) => handleRequest(() => api.get(`/events/${id}`)),
  update: (id, data) => handleRequest(() => api.put(`/events/${id}`, data)),
  delete: (id) => handleRequest(() => api.delete(`/events/${id}`)),
};

//* ❓ Missing Services
export const missingService = {
  create: (data) => handleRequest(() => api.post("/missing", data)),
  getAll: () => handleRequest(() => api.get("/missing")),
  getById: (id) => handleRequest(() => api.get(`/missing/${id}`)),
  update: (id, data) => handleRequest(() => api.put(`/missing/${id}`, data)),
  delete: (id) => handleRequest(() => api.delete(`/missing/${id}`)),
};

//* 👤 User Services (Nur für Admins)
export const userService = {
  create: (data) => handleRequest(() => api.post("/users", data)),
  getAll: () => handleRequest(() => api.get("/users")),
  getById: (id) => handleRequest(() => api.get(`/users/${id}`)),
  update: (id, data) => handleRequest(() => api.put(`/users/${id}`, data)),
  delete: (id) => handleRequest(() => api.delete(`/users/${id}`)),
};
