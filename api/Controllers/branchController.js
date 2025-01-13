import getBranchModel from "../Models/branchModel.js";
import AppError from "../Utilities/appError.js";
import catchAsync from "../Utilities/catchAsync.js";
import { isValidString, sanitizeInput } from "../Utilities/validation.js";

const createBranch = catchAsync(async (req, res, next) => {
  const { name } = req.body;

  // Validate and sanitize input
  const sanitizedName = sanitizeInput(name);
  if (!isValidString(sanitizedName, { min: 2, max: 50 })) {
    return next(new AppError("", 401));
  }

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

  res.status(201).json({
    message: "Branch created successfully",
    data: newBranch,
  });
});

const receiveBranches = catchAsync(async (req, res) => {
  // Dynamically get the Branch model for the current database connection
  const Branch = getBranchModel(req.db);

  // Fetch all branches from the database
  const branches = await Branch.find();

  return res.status(200).json({
    success: true,
    message: "Branches retrieved successfully",
    data: branches,
  });
});

export { createBranch, receiveBranches };
