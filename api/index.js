/* eslint-disable no-console */

import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config();

/* global process */
const dbConnectionString = process.env.PRIMERY_STR || "";
const PORT = process.env.PORT || 3000;

// Use a global variable to maintain a MongoDB connection across invocations
let isConnected = false;

// Declare server variable in the outer scope
let server;

// Function to connect to the database
export async function connectToDatabase() {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    // Connect to the database
    const dbConnection = await mongoose.connect(dbConnectionString);

    // Set connection state
    isConnected = dbConnection.connections[0].readyState === 1;
    console.log("Connected to Database");
  } catch (err) {
    console.error("Error connecting to database:", err.message);
    throw new Error("Failed to connect to the databases");
  }
}

// Add graceful shutdown handler
const gracefulShutdown = async (signal) => {
  console.log(`\n${signal} signal received. Starting graceful shutdown...`);

  try {
    // Close server first to stop accepting new connections
    if (server) {
      await new Promise((resolve) => server.close(resolve));
      console.log("Server closed");
    }

    // Close database connection
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log("Database connection closed");
    }

    console.log("Graceful shutdown completed");
    process.exit(0);
  } catch (err) {
    console.error("Error during graceful shutdown:", err);
    process.exit(1);
  }
};

// Connect to database and start the server
connectToDatabase()
  .then(() => {
    // Assign to the outer scope server variable
    server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    // Handle various shutdown signals
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
    process.on("uncaughtException", (err) => {
      console.error("Uncaught Exception:", err);
      gracefulShutdown("uncaughtException");
    });
    process.on("unhandledRejection", (reason, promise) => {
      console.error("Unhandled Rejection at:", promise, "reason:", reason);
      gracefulShutdown("unhandledRejection");
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
