import getStatusModel from "../Models/statusModel.js";
import catchAsync from "../Utilities/catchAsync.js";
import { sanitizeInput } from "../Utilities/validation.js";

const createStatus = catchAsync(async (req, res) => {
  const { status, isTab, subStatus, statusClass, description } = req.body;

  // Validate and sanitize input
  const sanitizedStatus = sanitizeInput(status);

  // Dynamically get the Status model for the current database connection
  const Status = getStatusModel(req.db);

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

const getAllStatus = catchAsync(async (req, res) => {
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

export { createStatus, getAllStatus };
