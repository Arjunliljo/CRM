/* global process */
import mongoose from "mongoose";
import Admin from "../Models/adminModel.js";
import catchAsync from "../Utilities/catchAsync.js";
import AppError from "../Utilities/appError.js";

const getClusterUrlByDatabaseName = (databaseName) => {
  switch (databaseName) {
    case 'marketlube':
      return process.env.CLUSTER_URL_1;
    case 'skymark':
      return process.env.CLUSTER_URL_2;
    default:
      throw new Error(`Cluster URL for ${databaseName} not found`);
  }
};

export const connectToUserAdminDb = async (adminId) => {
  try {
    // Fetch the admin document
    const admin = await Admin.findById(adminId);
    if (!admin) {
      throw new Error("Admin not found");
    }

    const { databaseName } = admin;

    // Get the corresponding cluster URL based on the databaseName
    const clusterUrl = getClusterUrlByDatabaseName(databaseName);

    // Create a connection to the corresponding admin's database
    const connection = await mongoose.createConnection(
      `${clusterUrl}/${databaseName}`,

    );

    console.log(`Successfully connected to the ${databaseName} database`);

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
