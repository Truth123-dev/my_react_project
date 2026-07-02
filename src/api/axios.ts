import axios, { type AxiosRequestHeaders } from "axios";

const baseURL = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  const headers: AxiosRequestHeaders = config.headers ?? {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  config.headers = headers;
  return config;
});

export default axiosInstance;
