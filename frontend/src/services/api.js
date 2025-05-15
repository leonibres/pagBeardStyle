import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para limpiar URLs
api.interceptors.request.use((config) => {
  // Eliminar slashes finales y caracteres especiales
  config.url = config.url.replace(/\/+$/, "").trim();
  return config;
});

export const authService = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  logout: () => api.post("/auth/logout"),
};
