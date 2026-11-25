
import axios from "axios";
import type {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

/*
 * Cấu hình Axios dùng chung
 * Cho cả Admin và Customer
 * Thiết lập Base URL và Timeout
 */
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/** 
 * Request Interceptor:
 * Tự động thêm Access Token vào Header trước khi gửi API.
 */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

export default axiosInstance;
