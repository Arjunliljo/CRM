import mongoose from "mongoose";
import Admin from "../Models/adminModel.js";

export const connectToUserAdminDb = async (adminId) => {
  const admin = await Admin.findById(adminId);
  if (!admin) {
    throw new Error("Admin not found");
  }

  const { databaseName } = admin;

  // create a connection to the corresponding admin's db
  const connection = await mongoose.createConnection(
    `mongodb://localhost:27017/${databaseName}`
  );
  return connection;
};

//to get db name for crud operations
export const addDbNameToRequest = (req, res, next) => {
  try {
    const currentConnection = mongoose.connection;
    if (currentConnection && currentConnection.name) {
      req.db = currentConnection.name;
    } else {
      req.db = null;
    }
    next();
  } catch (err) {
    console.error("Error in DB middleware:", err.message);
    next(err);
  }
};
