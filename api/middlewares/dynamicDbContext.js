/* global process */
import mongoose from "mongoose";
import catchAsync from "../Utilities/catchAsync.js";

export const getClusterUrlByDatabaseName = (count) => {
  const defaultUrl = process.env.PRIMARY_STR;
  const urls = process.env.CLUSTER_URLS.split(",,,,,,,");
  const url = urls[count] || defaultUrl;

  if (!url.startsWith("mongodb://") && !url.startsWith("mongodb+srv://")) {
    return defaultUrl;
  }

  return url;
};

export const connectToUserAdminDb = async (admin) => {
  try {
    // Fetch the admin document

    if (!admin) {
      throw new Error("Admin not found");
    }

    const { count } = admin;

    // Get the corresponding cluster URL based on the database count
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
