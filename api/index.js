import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
/* global process */

import mongoose from "mongoose";
import app from "./app.js";
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

(async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
  }
})();
