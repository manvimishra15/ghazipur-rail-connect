import axios from "axios";

/**
 * Centralized Axios instance.
 * Reads the backend base URL from VITE_API_BASE_URL.
 * When the real backend is wired up, no component changes are needed.
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "/api",
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

// Inject auth token if present (mock today, real JWT later).
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("rti_token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    // Centralized error funnel — components can rely on a normalized shape.
    const message =
      error?.response?.data?.message ?? error?.message ?? "Network error";
    return Promise.reject(new Error(message));
  },
);
