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
    throw error;
  }
};

//* News Services
export const createNews = (data) =>
  handleRequest(() => api.post("/news", data));
export const getAllNews = () => handleRequest(() => api.get("/news"));
export const getNewsById = (id) => handleRequest(() => api.get(`/news/${id}`));
export const updateNews = (id, data) =>
  handleRequest(() => api.put(`/news/${id}`, data));
export const deleteNews = (id) =>
  handleRequest(() => api.delete(`/news/${id}`));

//* Adoption Services
export const createAdoptionPost = (data) =>
  handleRequest(() => api.post("/adoption", data));
export const getAllAdoptionPosts = () =>
  handleRequest(() => api.get("/adoption"));
export const getAdoptionPostById = (id) =>
  handleRequest(() => api.get(`/adoption/${id}`));
export const updateAdoptionPost = (id, data) =>
  handleRequest(() => api.put(`/adoption/${id}`, data));
export const deleteAdoptionPost = (id) =>
  handleRequest(() => api.delete(`/adoption/${id}`));

//* Event Services
export const createEvent = (data) =>
  handleRequest(() => api.post("/events", data));
export const getAllEvents = () => handleRequest(() => api.get("/events"));
export const getEventById = (id) =>
  handleRequest(() => api.get(`/events/${id}`));
export const updateEvent = (id, data) =>
  handleRequest(() => api.put(`/events/${id}`, data));
export const deleteEvent = (id) =>
  handleRequest(() => api.delete(`/events/${id}`));

//* Missing Services
export const createMissingPost = (data) =>
  handleRequest(() => api.post("/missing", data));
export const getAllMissingPosts = () =>
  handleRequest(() => api.get("/missing"));
export const getMissingPostById = (id) =>
  handleRequest(() => api.get(`/missing/${id}`));
export const updateMissingPost = (id, data) =>
  handleRequest(() => api.put(`/missing/${id}`, data));
export const deleteMissingPost = (id) =>
  handleRequest(() => api.delete(`/missing/${id}`));

//* User Services
export const createUser = (data) =>
  handleRequest(() => api.post("/users", data));
export const getAllUsers = () => handleRequest(() => api.get("/users"));
export const getUserById = (id) => handleRequest(() => api.get(`/users/${id}`));
export const updateUser = (id, data) =>
  handleRequest(() => api.put(`/users/${id}`, data));
export const deleteUser = (id) =>
  handleRequest(() => api.delete(`/users/${id}`));
