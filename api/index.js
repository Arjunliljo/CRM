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

// Connect to database and start the server
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
