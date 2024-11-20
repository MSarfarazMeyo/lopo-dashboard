import axios from "axios";
import { LOCAL_STORAGE } from "../utils/constants";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const language = localStorage.getItem(LOCAL_STORAGE.language) || "en-US";
  config.headers["Accept-Language"] = language;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem(LOCAL_STORAGE.authStatus);
      window.location.href = "/";
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
