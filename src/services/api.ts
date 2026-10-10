import axios, { AxiosInstance, AxiosError } from 'axios';

// Base API configuration for Spring Boot API Gateway
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

// Request Interceptor: Attach JWT Token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('logancee_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Extract error messages & handle session expiry
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; error?: string }>) => {
    if (error.response) {
      const status = error.response.status;
      const serverMsg = error.response.data?.message || error.response.data?.error;

      if (status === 401) {
        console.warn('Session expired or unauthorized request (401).');
        // Clear expired token if present
        if (localStorage.getItem('logancee_token')) {
          localStorage.removeItem('logancee_token');
          localStorage.removeItem('logancee_user');
        }
      } else if (status === 403) {
        console.warn('Access Forbidden (403). Required permissions missing.');
      }

      const formattedError = new Error(serverMsg || `Request failed with status ${status}`);
      return Promise.reject(formattedError);
    } else if (error.request) {
      return Promise.reject(new Error('Unable to connect to GlobalCart server. Please verify backend is running on http://localhost:8080.'));
    }
    return Promise.reject(error);
  }
);

export default api;
