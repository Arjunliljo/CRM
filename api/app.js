import express from "express";
import cors from "cors";
import AppError from "./Utilities/appError.js";
import versionOne from "./versions/v1.js";
import globalErrorHandler from "./Utilities/globalErrorhandler.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(addDbNameToRequest);

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PATCH,PUT,DELETE",
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
