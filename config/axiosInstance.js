import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle errors globally
//     if (error.response?.status === 401) {
//       console.error("Unauthorized access. Redirecting to login...");
//       // Redirect to login page or show error
//     }
//     return Promise.reject(error);
//   }
// );

export default apiClient;
