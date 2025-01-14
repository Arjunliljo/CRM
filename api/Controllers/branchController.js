import getBranchModel from "../Models/branchModel.js";
import AppError from "../Utilities/appError.js";
import catchAsync from "../Utilities/catchAsync.js";
import { sanitizeInput } from "../Utilities/validation.js";

const createBranch = catchAsync(async (req, res, next) => {
  const { name } = req.body;

  // Validate and sanitize input
  const sanitizedName = sanitizeInput(name);

  // Dynamically get the Branch model for the current database connection
  const Branch = getBranchModel(req.db);

  // Check if branch already exists in the specified database
  const existingBranch = await Branch.findOne({ name: sanitizedName });
  if (existingBranch) {
    return next(
      new AppError(
        `"Branch with the name "${sanitizedName}" already exists."`,
        400
      )
    );
  }
  // Create new branch in the correct database
  const newBranch = await Branch.create({ name: sanitizedName });

  if (!newBranch) return next(new AppError("Failed to create branch", 400));

  res.status(201).json({
    message: "Branch created successfully",
    data: newBranch,
  });
});

const getAllBranches = catchAsync(async (req, res, next) => {
  // Dynamically get the Branch model for the current database connection
  const Branch = getBranchModel(req.db);

  // Fetch all branches from the database
  const branches = await Branch.find();

  if (!branches) return next(new AppError("Cannot find branches", 404));

  return res.status(200).json({
    success: true,
    message: "Branches retrieved successfully",
    data: branches,
  });
});

const getBranch = catchAsync(async (req, res, next) => {
  // Dynamically get the Branch model for the current database connection
  const Branch = getBranchModel(req.db);

  // Fetch all branches from the database
  const branch = await Branch.findById(req.params.id);

  if (!branch) return next(new AppError("Cannot find branch", 404));

  return res.status(200).json({
    success: true,
    message: "Branch retrieved successfully",
    data: branch,
  });
});
const updateBranch = catchAsync(async (req, res, next) => {
  const Branch = getBranchModel(req.db);
  const branch = await Branch.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!branch) return next(new AppError("Cannot find branch", 404));
  return res.status(200).json({
    success: true,
    message: "Branch updated successfully",
    data: branch,
  });
});
const deleteBranch = catchAsync(async (req, res, next) => {
  const Branch = getBranchModel(req.db);
  const branch = await Branch.findByIdAndDelete(req.params.id);

  if (!branch) return next(new AppError("Cannot find branch", 404));

  return res.status(200).json({
    success: true,
    message: "Branch deleted successfully",
    data: branch,
  });
});

export { createBranch, getAllBranches, getBranch, deleteBranch, updateBranch };
