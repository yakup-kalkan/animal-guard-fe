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

//* Request-Handler mit Unterstützung für Datei-Uploads (`imageUploads`)
const handleRequest = async (request, isFileUpload = false) => {
  try {
    const response = await request();
    return response.data;
  } catch (error) {
    console.error("API Fehler:", error.response?.data || error.message);
    if (error.response?.status === 401) {
      logoutUser();
    }
    throw error;
  }
};

//* Automatische Erkennung von Datei-Uploads
const preparePayload = (data) => {
  if (data.imageUploads && data.imageUploads.length > 0) {
    const formData = new FormData();

    // **Bilder hinzufügen**
    data.imageUploads.forEach((file) => formData.append("imageUploads", file));

    // **Restliche Daten als JSON**
    formData.append(
      "data",
      JSON.stringify({ ...data, imageUploads: undefined })
    );

    return { payload: formData, isFileUpload: true };
  }

  return { payload: data, isFileUpload: false };
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

//* 📸 Generische Funktion für Datei-Uploads
const postWithFile = async (url, data) => {
  const { payload, isFileUpload } = preparePayload(data);
  return handleRequest(() =>
    api.post(url, payload, {
      headers: isFileUpload ? { "Content-Type": "multipart/form-data" } : {},
    })
  );
};

//* 📰 News Services (Jetzt mit Datei-Upload)
export const newsService = {
  create: (data) => postWithFile("/news", data),
  getAll: () => handleRequest(() => api.get("/news")),
  getById: (id) => handleRequest(() => api.get(`/news/${id}`)),
  update: (id, data) => postWithFile(`/news/${id}`, data),
  delete: (id) => handleRequest(() => api.delete(`/news/${id}`)),
};

//* 🐾 Adoption Services (Jetzt mit Datei-Upload)
export const adoptionService = {
  create: (data) => handleRequest(() => api.post("/adoption", data)),
  getAll: () => handleRequest(() => api.get("/adoption")),
  getById: (id) => handleRequest(() => api.get(`/adoption/${id}`)),
  update: (id, data) => postWithFile(`/adoption/${id}`, data),
  delete: (id) => handleRequest(() => api.delete(`/adoption/${id}`)),
};

//* 🎉 Event Services (Jetzt mit Datei-Upload)
export const eventService = {
  create: (data) => postWithFile("/events", data),
  getAll: () => handleRequest(() => api.get("/events")),
  getById: (id) => handleRequest(() => api.get(`/events/${id}`)),
  update: (id, data) => postWithFile(`/events/${id}`, data),
  delete: (id) => handleRequest(() => api.delete(`/events/${id}`)),
};

//* ❓ Missing Services (Jetzt mit Datei-Upload)
export const missingService = {
  create: (data) => postWithFile("/missing", data),
  getAll: () => handleRequest(() => api.get("/missing")),
  getById: (id) => handleRequest(() => api.get(`/missing/${id}`)),
  update: (id, data) => postWithFile(`/missing/${id}`, data),
  delete: (id) => handleRequest(() => api.delete(`/missing/${id}`)),
};

//* 👤 User Services (Admin-only, kein Datei-Upload nötig)
export const userService = {
  create: (data) => handleRequest(() => api.post("/users", data)),
  getAll: () => handleRequest(() => api.get("/users")),
  getById: (id) => handleRequest(() => api.get(`/users/${id}`)),
  update: (id, data) => handleRequest(() => api.put(`/users/${id}`, data)),
  delete: (id) => handleRequest(() => api.delete(`/users/${id}`)),
};

export const storyService = {
  create: (data) => handleRequest(() => api.post("/story", data)),
  getAll: () => handleRequest(() => api.get("/story")),
  getById: (id) => handleRequest(() => api.get(`/story/${id}`)),
  update: (id, data) => handleRequest(() => api.put(`/story/${id}`, data)),
  delete: (id) => handleRequest(() => api.delete(`/story/${id}`)),
};

export const uploadService = {
  uploadImages: (files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("imageUploads", file));

    return handleRequest(() =>
      api.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    );
  },
};
