import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import mongoose from "mongoose";
import app from "./app.js";
import Admin from "./Models/adminModel.js";
import { connectToUserAdminDb } from "./middlewares/dynamicDbContext.js";

const dbConnectionString = process.env.PRIMARY_STR || "";

const PORT = process.env.PORT || 3000;

let isConnected = false;
let server;

const dbConnections = []; // to store active db

// to connect primary database (CRM)
async function connectToDatabase() {
  if (isConnected) {
    console.log("Using existing primary database connection");
    return;
  }

  try {
    const dbConnection = await mongoose.connect(dbConnectionString);

    isConnected = dbConnection.connections[0].readyState === 1;

    console.log("Connected to Primary Database (CRM)");
  } catch (err) {
    console.error("Error connecting to primary database:", err.message);
    throw new Error("Failed to connect to primary database");
  }
}

// Function to connect to admin-specific db dynamically
async function connectToUserAdminDatabases() {
  try {
    const admins = await Admin.find(); // Fetch all admin users

    for (const admin of admins) {
      const { _id, databaseName } = admin;

      // Create connection to each admin's db
      const userAdminDbConnection = await connectToUserAdminDb(_id);
      dbConnections.push(userAdminDbConnection);
      console.log(`Connected to User Admin Database: ${databaseName}`);
    }
  } catch (err) {
    console.error("Error connecting to user-admin databases:", err.message);
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

    // Close all database connections (including admin db's)
    for (const connection of dbConnections) {
      if (connection.readyState === 1) {
        await connection.close();
        console.log("Database connection closed");
      }
    }

    console.log("Graceful shutdown completed");
    process.exit(0);
  } catch (err) {
    console.error("Error during graceful shutdown:", err);
    process.exit(1);
  }
};

// Connect to databases and start the server
connectToDatabase()
  .then(() => connectToUserAdminDatabases()) // Connect to all userAdmin databases
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
