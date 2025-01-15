import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
/* global process */

import mongoose from "mongoose";
import app from "./app.js";
import Client from "./Models/clientModel.js";
import { connectToUserAdminDb } from "./middlewares/dynamicDbContext.js";
import { dbConnector } from "./Utilities/helper.js";
const dbConnectionString = process.env.PRIMARY_STR || "";

const PORT = process.env.PORT || 3000;

let isConnected = false;
let server;

const dbConnections = []; // to store active db
let primaryDbConnection;

// to connect primary database (CRM)
async function connectToDatabase() {
  if (isConnected) {
    console.log("Using existing primary database connection");
    return primaryDbConnection;
  }

  try {
    console.log("Attempting to connect to:", dbConnectionString); // Debug log

    primaryDbConnection = mongoose.createConnection(dbConnectionString);

    // Wait for the connection to be ready
    await dbConnector(primaryDbConnection);

    dbConnections.push(primaryDbConnection);

    // Bind the Client model to the primary connection
    Client.init(primaryDbConnection);

    isConnected = true;
    console.log("Connected to Primary Database (CRM)");
    return primaryDbConnection;
  } catch (err) {
    console.error("Error connecting to primary database:", err.message);
    throw err;
  }
}

// Function to connect to admin-specific db dynamically
async function connectAllDatabases(primaryDbConnection) {
  try {
    if (!primaryDbConnection || primaryDbConnection.readyState !== 1) {
      throw new Error("Primary database connection not established");
    }

    // const clients = await primaryDbConnection.model("Client").find();

    // const connections = await Promise.all(
    //   clients.map(async (client) => {
    //     try {
    //       const userAdminDbConnection = await connectToUserAdminDb(client);
    //       console.log(
    //         `Connected to User Admin Database: ${client.databaseName}`
    //       );
    //       return userAdminDbConnection;
    //     } catch (err) {
    //       console.error(
    //         `Failed to connect to database for client ${client._id}:`,
    //         err.message
    //       );
    //       return null;
    //     }
    //   })
    // );
  } catch (err) {
    console.error("Error connecting to user-admin databases:", err.message);
    throw err;
  }
}

// Add graceful shutdown handler

// Connect to databases and start the server
connectToDatabase()
  .then(() => connectAllDatabases(primaryDbConnection)) // Connect to all userAdmin databases
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
