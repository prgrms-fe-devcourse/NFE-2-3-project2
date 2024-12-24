import axios from "axios";
import { useAuthStore } from "../store/authStore";

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  // withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
