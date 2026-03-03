import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    //add tokens in the header
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;

// I created a custom Axios instance with a base URL and added a request interceptor to automatically attach JWT tokens from
//  localStorage to every API call. This avoids repeating authorization logic and centralizes authentication handling.

// This code creates an Axios instance and uses interceptor to add JWT token automatically in headers before every request.
