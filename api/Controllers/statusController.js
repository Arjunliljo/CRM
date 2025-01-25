import Status from "../Models/statusModel.js";

import getStatusModel from "../Models/statusModel.js";
import AppError from "../Utilities/appError.js";
import catchAsync from "../Utilities/catchAsync.js";
import { sanitizeInput } from "../Utilities/validation.js";

const createStatus = catchAsync(async (req, res, next) => {
  let { status, isTab, subStatuses, selectedClass, description } = req.body;

  // Validate and sanitize input
  const sanitizedStatus = sanitizeInput(status);

  // Dynamically get the Status model for the current database connection
  // const Status = getStatusModel(req.db);

  const newStatus = await Status.create(req.body);
  if (!newStatus) return next(new AppError("Failed to create status", 400));

  res.status(201).json({
    message: "Status created successfully",
    data: newStatus,
  });
});

const getAllStatus = catchAsync(async (req, res, next) => {
  const statuses = await Status.find();
  if (!statuses) return next(new AppError("Cannot find status", 404));
  // Return the fetched statuses in the response
  return res.status(200).json({
    success: true,
    message: "Statuses retrieved successfully",
    data: statuses,
  });
});

const getStatus = catchAsync(async (req, res) => {
  // Dynamically get the Status model for the current database connection
  const Status = getStatusModel(req.db);

  // Fetch all statuses from the database
  const statuses = await Status.findById(req.params.id);

  // Return the fetched statuses in the response
  return res.status(200).json({
    success: true,
    message: "Statuses retrieved successfully",
    data: statuses,
  });
});
const updateStatus = catchAsync(async (req, res, next) => {
  // Fetch all statuses from the database
  const status = await Status.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!status) return next(new AppError("Failed to update status", 400));
  // Return the fetched statuses in the response
  return res.status(200).json({
    success: true,
    message: "Statuses updated successfully",
    data: status,
  });
});

const deleteStatus = catchAsync(async (req, res, next) => {
  const status = await Status.findByIdAndDelete(req.params.id);
  if (!status) return next(new AppError("Failed to delete status", 400));
  return res.status(200).json({
    success: true,
    message: "Status deleted successfully",
    data: status,
  });
});

const deleteSubStatus = catchAsync(async (req, res, next) => {
  const { val } = req.params;

  if (!val) {
    return res.status(400).json({ message: "Substatus name is required" });
  }

  const status = await Status.findOne({
    subStatus: { $elemMatch: { $eq: val } },
  });

  if (!status) {
    return res.status(404).json({ message: "Substatus not found" });
  }

  const subStatusIndex = status.subStatus.indexOf(val);

  if (subStatusIndex === -1) {
    return res.status(404).json({ message: "Substatus not found" });
  }

  status.subStatus.splice(subStatusIndex, 1);

  await status.save();
  if (!status) return next(new AppError("Failed to delete sub status", 400));
  return res.status(200).json({ message: "Substatus deleted successfully" });
});

export {
  createStatus,
  getAllStatus,
  getStatus,
  updateStatus,
  deleteStatus,
  deleteSubStatus,
};
