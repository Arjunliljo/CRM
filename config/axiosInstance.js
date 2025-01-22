import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  // baseURL: "http://localhost:3000/api/v2",

  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

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
