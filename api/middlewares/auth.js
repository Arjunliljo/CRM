// import mongoose from "mongoose";
// import { verifyToken } from "../Utilities/jwt.js";
// import { getClusterUrlByDatabaseName } from "./dynamicDbContext.js";

// const dbConnections = {};

// const protect = async (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) {
//     return res.status(401).json({ message: "Authentication token missing" });
//   }

//   try {
//     // Decode the token to get user and database information
//     const { adminId, count, role } = verifyToken(token);

//     if (!count) {
//       return res
//         .status(401)
//         .json({ message: "Database name missing in token" });
//     }

//     // Get the correct cluster URL for thecount
//     const mongoUri = getClusterUrlByDatabaseName(count);

//     // Connect to the database if not already connected
//     if (!dbConnections[count]) {
//       console.log(`Connecting to database: ${count}`);
//       dbConnections[count] = mongoose.createConnection(mongoUri);
//       // Handle connection errors
//       dbConnections[count].on("error", (err) => {
//         console.error(`Error connecting to ${count}:`, err.message);
//         delete dbConnections[count]; // Remove invalid connection from cache
//       });

//       // Connection success log
//       dbConnections[count].once("open", () => {
//         console.log(`Successfully connected to database: ${count}`);
//       });
//     }

//     // Attach the database connection and user details to the request
//     req.db = dbConnections[count];
//     req.db.count = count;
//     req.user = { adminId, role, count };

//     next();
//   } catch (error) {
//     console.error("Authentication error:", error.message);
//     res.status(401).json({ message: "Authentication failed" });
//   }
// };

// export { protect };
