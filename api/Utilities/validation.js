import mongoose from "mongoose";

// sanitizeInput is to prevent attacks and remove dangerous characters
export const sanitizeInput = (input) => {
  if (typeof input !== "string") return "";
  return input
    .replace(/<script.*?>.*?<\/script>/gi, "") // to remove <script> tags
    .replace(/[<>]/g, ""); // Remove < and >
};

export const isValidString = (input, { min, max }) => {
  if (
    typeof input !== "string" ||
    input.trim().length < min ||
    input.trim().length > max
  ) {
    return false;
  }

  const unsafePatterns = /[<>]/; // to find unsafe characters
  return !unsafePatterns.test(input);
};

export const validateObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
