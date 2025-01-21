import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.BASE_URL,
  // baseURL: "http://localhost:3000/api/v2",

  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add interceptors if needed
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    if (error.response?.status === 401) {
      console.error("Unauthorized access. Redirecting to login...");
      // Redirect to login page or show error
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
