import Role from "../Models/roleModel.js";
import AppError from "../Utilities/appError.js";
import catchAsync from "../Utilities/catchAsync.js";
import { sanitizeInput } from "../Utilities/validation.js";

const createRole = catchAsync(async (req, res, next) => {
  let { name, description } = req.body;

  // Sanitize and validate inputs
  name = sanitizeInput(name);
  description = sanitizeInput(description);

  // Create a new role in the correct database
  const newRole = await Role.create({ name, description });
  if (!newRole) return next(new AppError("Failed to create role", 400));

  // Send a success response
  return res.status(201).json({
    success: true,
    message: "Role created successfully",
    data: newRole,
  });
});

const getAllRoles = catchAsync(async (req, res, next) => {
  const roles = await Role.find({});
  if (!roles) return next(new AppError("Cannot find role", 404));

  return res.status(200).json({
    success: true,
    message: "Roles fetched successfully",
    data: roles,
  });
});

const updateRole = catchAsync(async (req, res, next) => {
  const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!role) return next(new AppError("Cannot find role", 404));
  return res.status(200).json({
    success: true,
    message: "Roles fetched successfully",
    data: role,
  });
});

const getRole = catchAsync(async (req, res) => {
  const role = await Role.findById(req.params.id);

  return res.status(200).json({
    success: true,
    message: "Role fetched successfully",
    data: role,
  });
});
const deleteRole = catchAsync(async (req, res) => {
  const role = await Role.findByIdAndDelete(req.params.id);

  return res.status(200).json({
    success: true,
    message: "Role deleted successfully",
    data: role,
  });
});

export { createRole, getAllRoles, getRole, updateRole, deleteRole };
