import getRoleModel from "../Models/roleModel.js";
import AppError from "../Utilities/appError.js";
import catchAsync from "../Utilities/catchAsync.js";
import { sanitizeInput } from "../Utilities/validation.js";

const createRole = catchAsync(async (req, res, next) => {
  let { name, description } = req.body;

  // Sanitize and validate inputs
  name = sanitizeInput(name);
  description = sanitizeInput(description);

  // Dynamically get the Role model for the current database connection
  const Role = getRoleModel(req.db);

  // Check if role already exists in the specified database
  const existingRole = await Role.findOne({ name });
  if (existingRole) {
    return next(
      new AppError(`Role with the name "${name}" already exists.`, 401)
    );
  }

  // Create a new role in the correct database
  const newRole = await Role.create({ name, description });

  // Send a success response
  return res.status(201).json({
    success: true,
    message: "Role created successfully",
    data: newRole,
  });
});

const getAllRoles = catchAsync(async (req, res) => {
  const Role = getRoleModel(req.db);
  const roles = await Role.find({});

  return res.status(200).json({
    success: true,
    message: "Roles fetched successfully",
    data: roles,
  });
});

const updateRole = catchAsync(async (req, res) => {
  const Role = getRoleModel(req.db);
  const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  return res.status(200).json({
    success: true,
    message: "Roles fetched successfully",
    data: role,
  });
});

const getRole = catchAsync(async (req, res) => {
  const Role = getRoleModel(req.db);
  const role = await Role.findById(req.params.id);

  return res.status(200).json({
    success: true,
    message: "Role fetched successfully",
    data: role,
  });
});
const deleteRole = catchAsync(async (req, res) => {
  const Role = getRoleModel(req.db);
  const role = await Role.findByIdAndDelete(req.params.id);

  return res.status(200).json({
    success: true,
    message: "Role deleted successfully",
    data: role,
  });
});
export { createRole, getAllRoles, getRole, updateRole, deleteRole };
