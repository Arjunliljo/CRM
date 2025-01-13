import getStatusModel from "../Models/statusModel.js";
import catchAsync from "../Utilities/catchAsync.js";
import { isValidString, sanitizeInput } from "../Utilities/validation.js";

const createStatus = catchAsync(async (req, res) => {
  const { status, isTab, subStatus, statusClass, description } = req.body;

  // Validate and sanitize input
  const sanitizedStatus = sanitizeInput(status);
  if (!isValidString(sanitizedStatus, { min: 2, max: 50 })) {
    return res.status(400).json({
      message: "Status name must be valid and at least 2 characters long.",
    });
  }

  // Validate description
  if (description && !isValidString(description, { min: 3, max: 100 })) {
    return res.status(400).json({
      message: "Description must be between 3 and 100 characters.",
    });
  }

  // Dynamically get the Status model for the current database connection
  const Status = getStatusModel(req.db);

  // Check for an existing status with the same name (case-insensitive)
  const existingStatus = await Status.findOne({
    status: { $regex: `^${sanitizedStatus}$`, $options: "i" }, // Case-insensitive match
  });

  if (existingStatus) {
    return res.status(400).json({
      message: `Status with the name "${sanitizedStatus}" already exists.`,
    });
  }

  // Create a new status in the database
  const newStatus = await Status.create({
    status: sanitizedStatus,
    isTab,
    class: statusClass,
    subStatus,
    description,
  });

  res.status(201).json({
    message: "Status created successfully",
    data: newStatus,
  });
});

const receiveAllStatus = catchAsync(async (req, res) => {
  // Dynamically get the Status model for the current database connection
  const Status = getStatusModel(req.db);

  // Fetch all statuses from the database
  const statuses = await Status.find();

  // Return the fetched statuses in the response
  return res.status(200).json({
    success: true,
    message: "Statuses retrieved successfully",
    data: statuses,
  });
});

export { createStatus, receiveAllStatus };
