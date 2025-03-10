import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
/* global process */

import mongoose from "mongoose";
import app from "./app.js";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
const dbConnectionString = process.env.PRIMARY_STR || "";
const PORT = process.env.PORT || 3000;

let isConnected = false;

const dbConnections = [];
let primaryDbConnection;

// to connect primary database (CRM)
async function connectToDatabase() {
  if (isConnected) {
    console.log("Using existing primary database connection");
    return primaryDbConnection;
  }

  try {
    primaryDbConnection = mongoose.connect(dbConnectionString);
    dbConnections.push(primaryDbConnection);

    isConnected = true;

    console.log("Connected to Primary Database (CRM)");
    return primaryDbConnection;
  } catch (err) {
    console.error("Error connecting to primary database:", err.message);
    throw err;
  }
}

//socket server
const server = createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("setup", (userId) => {
    socket.userId = userId;
    console.log(`User setup completed: ${userId}`);
  });

  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
    console.log(`User joined chat: ${chatId}`);
  });

  socket.on("sendMessage",(data)=>{
    console.log("received", data);

    // Emit to specific chat room for real-time chat updates
    socket.to(data.chatId).emit("receiveMessage", data);

    // Emit globally for updating chat lists/notifications
    socket.broadcast.emit("newMessage", {
      chatId: data.chatId,
      message: data
    });
  })

// In your socket.js file or where you handle socket events
socket.on("markMessagesAsRead", (data) => {
  const { chatId, userId } = data;

  // Broadcast to all users in the chat that messages have been read
  socket.to(chatId).emit("messagesRead", {
    chatId,
    readByUserId: userId
  });
});

  socket.on("typing", ({ chatId }) => {
    socket.to(chatId).emit("typing", { chatId });
  });

  socket.on("stopTyping", ({ chatId }) => {
    socket.to(chatId).emit("stopTyping", { chatId });
  });

  socket.on("leaveChat", (chatId) => {
    socket.leave(chatId);
    console.log(`User left chat: ${chatId}`);
  });

  socket.on("disconnect", (data) => {
    console.log("User disconnected",data);
  });
});


(async () => {
  try {
    await connectToDatabase();
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
  }
})();
