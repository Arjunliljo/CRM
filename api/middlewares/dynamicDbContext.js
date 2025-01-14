/* global process */
import mongoose from "mongoose";
import Admin from "../Models/clientModel.js";
import catchAsync from "../Utilities/catchAsync.js";

export const getClusterUrlByDatabaseName = (count = 1) => {
  const url = process.env.arr.split(",,,,,,,")[count];
  console.log(url, "urlwdww");
  const clusterUrl = url[count];
  return clusterUrl;
};

export const connectToUserAdminDb = async (admin) => {
  try {
    // Fetch the admin document

    if (!admin) {
      throw new Error("Admin not found");
    }

    const { databaseName, count } = admin;

    // Get the corresponding cluster URL based on the databaseName
    const clusterUrl = await getClusterUrlByDatabaseName(count);

    // Create a connection to the corresponding admin's database
    const connection = await mongoose.createConnection(`${clusterUrl}`);

    console.log(`Successfully connected to the database`);

    return connection;
  } catch (error) {
    console.error("Error connecting to database:", error.message);
    throw error; // Re-throw the error if connection fails
  }
};

//to get db url for crud operations
export const addDbNameToRequest = catchAsync(async (req, res, next) => {
  const currentConnection = mongoose.connection;
  if (currentConnection && currentConnection.name) {
    req.db = currentConnection;
  } else {
    req.db = null;
  }
  next();
});
