import axios from "axios";

// Create an Axios instance with default settings
const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/v2`,
  timeout: 10000,
});

export default apiClient;
