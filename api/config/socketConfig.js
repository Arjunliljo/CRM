import { Server as SocketIOServer } from "socket.io";

export const handleSocketEvents = (server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.CLIENT_URL || "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("joinChat", (chatId) => {
      socket.join(chatId);
      console.log(`User joined chat: ${chatId}`);
    });

    socket.on("typing", ({ chatId, ...data }) => {
      socket.to(chatId).emit("typing", data);
    });

    socket.on("stopTyping", ({ chatId, ...data }) => {
      socket.to(chatId).emit("stopTyping", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  return io; // Return io instance if needed elsewhere
};
