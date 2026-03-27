import axios from "axios";

const trimTrailingSlash = (value) => value?.replace(/\/+$/, "");

const resolveApiBase = () => {
  const configuredBase = trimTrailingSlash(import.meta.env.VITE_API_BASE_URL);

  if (configuredBase) {
    return configuredBase;
  }

  if (typeof window !== "undefined") {
    const { hostname, origin } = window.location;

    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return "http://localhost:7000";
    }

    return trimTrailingSlash(origin);
  }

  return "http://localhost:7000";
};

const api = axios.create({
  baseURL: resolveApiBase(),
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
