import { io } from "socket.io-client";

// Replace with your backend URL
const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL;

// Initialize Socket connection
const socket = io(SOCKET_SERVER_URL, {
  transports: ["websocket"],
});

export default socket;
