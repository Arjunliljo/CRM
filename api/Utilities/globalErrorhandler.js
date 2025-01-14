/* eslint-disable no-console */
import AppError from "./appError.js";

const sendErr = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    isOperational: err.isOperational,
    error: err,
  });
};

const handleInvalidId = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateDB = (err) => {
  const value = err.errmsg.match(/"([^"]*)"/);
  const message = `Duplicate field value ${
    value?.[0] ? value[0] : "Found"
  }. Please use anothor value`;
  return new AppError(message, 400);
};

const handleValidationDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJsonInvalidToken = () => {
  return new AppError("Invalid Token Please login again", 401);
};

// Handle expired JWT
const handleJWTExpired = () => {
  return new AppError("Your token has expired! Please log in again.", 401);
};

// Handle programming/syntax errors
const handleDevelopmentError = (err) => {
  return new AppError(err.message || "Programming error occurred", 500);
};

// Handle network/connection errors
const handleConnectionError = () => {
  return new AppError("Database connection error", 503);
};

export default function globalErrorHandler(err, req, res) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  err.isOperational = err.isOperational || false;

  console.log(err.name, "err name");

  //   catching invalid id
  if (err.name === "CastError") err = handleInvalidId(err);

  //Catching duplicate Fields
  if (err.code === 11000) err = handleDuplicateDB(err);
  else if (err.name === "MongoServerError") err = handleDuplicateDB(err);

  //handle validationError
  if (err.name === "ValidationError") err = handleValidationDB(err);

  //invalid token
  if (err.name === "JsonWebTokenError") err = handleJsonInvalidToken(err);

  // Add these new checks
  if (err.name === "TokenExpiredError") err = handleJWTExpired();
  if (err.name === "MongooseServerSelectionError")
    err = handleConnectionError();

  // Development vs Production error handling
  if (process.env.NODE_ENV === "development") {
    err.stack = err.stack; // Include stack trace in development
  } else {
    err.stack = undefined; // Remove stack trace in production
  }

  sendErr(err, res);
}
