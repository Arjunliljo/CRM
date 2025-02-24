import express from "express";
import cors from "cors";
import AppError from "./Utilities/appError.js";
import versionOne from "./versions/v1.js";
import globalErrorHandler from "./Utilities/globalErrorhandler.js";
import http from "http";
import { handleSocketEvents } from "./config/socketConfig.js";
import cookieParser from "cookie-parser";
const app = express();

const server = http.createServer(app);
const io = handleSocketEvents(server);

// Store io instance in app (if needed for broadcasting)
app.set("socket.io", io);

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(addDbNameToRequest);

// authorizeB2().then(() => {
//   console.log("Successfully authorized with Backblaze B2");
// }).catch((err) => {
//   console.error("Error authorizing with Backblaze B2:", err);
// });

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PATCH,PUT,DELETE",
    credentials: true,
  })
);

// Define routes BEFORE error handling
app.use("/api/v2", versionOne);

// Error handling for undefined routes
app.all("*", (req, res, next) => {
  return next(
    new AppError(`Cannot find the ${req.originalUrl} on the page!`, 404)
  );
});

// Global error handler should be last
app.use(globalErrorHandler);

export default app;
