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

  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
    console.log(`User joined chat: ${chatId}`);
  });

  socket.on("sendMessage",(data)=>{
    console.log("received", data);

    io.to(data.chatId).emit("receiveMessage", data);

  })

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
