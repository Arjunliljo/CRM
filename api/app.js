import express from "express";
import cors from "cors";
import AppError from "./Utilities/appError.js";
import versionOne from "./versions/v1.js";
import globalErrorHandler from "./Utilities/globalErrorhandler.js";
import http from "http";
import { handleSocketEvents } from "./config/socketConfig.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const app = express();

const server = http.createServer(app);
const io = handleSocketEvents(server);

// Store io instance in app (if needed for broadcasting)
app.set("socket.io", io);

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDistPath = path.resolve(__dirname, "..", "dist");

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://skymark.marketlube.in",
    ],
    methods: "GET,POST,PATCH,PUT,DELETE",
    credentials: true,
  })
);

// Define routes BEFORE error handling
app.use("/api/v2", versionOne);

// Check if the dist folder exists
if (fs.existsSync(clientDistPath)) {
  // Serve static files from the React app
  app.use(express.static(clientDistPath));

  // The "catchall" handler: for any request that doesn't
  // match one above, send back React's index.html file.
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next(
        new AppError(`Cannot find ${req.originalUrl} on this server!`, 404)
      );
    }
    res.sendFile(path.join(clientDistPath, "index.html"));
  });
} else {
  console.warn("Client dist folder not found at:", clientDistPath);
  app.get("*", (req, res, next) => {
    if (!req.path.startsWith("/api")) {
      return res
        .status(404)
        .send(
          "Frontend not built. Please run the build command in the Client directory."
        );
    }
    next();
  });
}

// Error handling for undefined routes
app.all("*", (req, res, next) => {
  return next(
    new AppError(`Cannot find the ${req.originalUrl} on the page!`, 404)
  );
});

// Global error handler should be last
app.use(globalErrorHandler);

export default app;
