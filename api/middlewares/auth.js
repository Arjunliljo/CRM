import mongoose from "mongoose";
import { verifyToken } from "../Utilities/jwt.js";

const dbConnections = {};

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authentication token missing" });
  }

  try {
    // Decode the token to get user and database information
    const { adminId, dbName, role } = verifyToken(token);
    console.log(adminId, dbName, role);

    const mongoUri =
      process.env.DB_DYNAMIC_URL || `mongodb://localhost:27017/${dbName}`;
    // Connect to the database if not already connected
    if (!dbConnections[dbName]) {
      console.log(`Connecting to database: ${dbName}`);
      dbConnections[dbName] = mongoose.createConnection(mongoUri);
    }
    // Attach the database connection and user details to the request
    req.db = dbConnections[dbName];
    req.db.dbName = dbName;
    req.user = { adminId, role, dbName };

    next();
  } catch (error) {
    console.error("Authentication failed:", error.message);
    res.status(401).json({ message: "Authentication failed" });
  }
};

export { protect };
