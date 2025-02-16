import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  // baseURL: "https://c4de-106-222-237-254.ngrok-free.app/api/v2",
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
