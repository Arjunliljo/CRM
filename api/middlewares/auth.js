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
    res.status(401).json({ message: "Authentication failed" });
  }
};

export { protect };


// Function to map dbName to corresponding cluster URLs
// const getClusterUrlByDbName = (dbName) => {
//   switch (dbName) {
//     case "db1":
//       return process.env.CLUSTER_URL_1;
//     case "db2":
//       return process.env.CLUSTER_URL_2;
//     case "db3":
//       return process.env.CLUSTER_URL_3;
//     case "db4":
//       return process.env.CLUSTER_URL_4;
//     default:
//       throw new Error(`Cluster URL for ${dbName} not found`);
//   }
// };

// const protect = async (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) {
//     return res.status(401).json({ message: "Authentication token missing" });
//   }

//   try {
//     // Decode the token to get user and database information
//     const { adminId, dbName, role } = verifyToken(token);

//     if (!dbName) {
//       return res.status(401).json({ message: "Database name missing in token" });
//     }

//     // Get the correct cluster URL for the dbName
//     const mongoUri = getClusterUrlByDbName(dbName);

//     // Connect to the database if not already connected
//     if (!dbConnections[dbName]) {
//       console.log(`Connecting to database: ${dbName}`);
//       dbConnections[dbName] = mongoose.createConnection(mongoUri, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       });

//       // Handle connection errors
//       dbConnections[dbName].on("error", (err) => {
//         console.error(`Error connecting to ${dbName}:`, err.message);
//         delete dbConnections[dbName]; // Remove invalid connection from cache
//       });

//       // Connection success log
//       dbConnections[dbName].once("open", () => {
//         console.log(`Successfully connected to database: ${dbName}`);
//       });
//     }

//     // Attach the database connection and user details to the request
//     req.db = dbConnections[dbName];
//     req.db.dbName = dbName;
//     req.user = { adminId, role, dbName };

//     next();
//   } catch (error) {
//     console.error("Authentication error:", error.message);
//     res.status(401).json({ message: "Authentication failed" });
//   }
// };

// export { protect };
