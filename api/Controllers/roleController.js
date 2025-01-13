import getRoleModel from "../Models/roleModel.js";
import catchAsync from "../Utilities/catchAsync.js";
import { isValidString, sanitizeInput } from "../Utilities/validation.js";

const createRole = catchAsync(async (req, res) => {
  let { name, description } = req.body;

  // Sanitize and validate inputs
  name = sanitizeInput(name);
  description = sanitizeInput(description);

  if (!isValidString(name, { min: 2, max: 50 })) {
    return res.status(400).json({
      success: false,
      message:
        "Invalid name: must be at least 2 characters long and not contain malicious content.",
    });
  }

  if (!isValidString(description, { min: 2, max: 100 })) {
    return res.status(400).json({
      success: false,
      message:
        "Invalid description: must be between 3 and 100 characters long.",
    });
  }

  // Dynamically get the Role model for the current database connection
  const Role = getRoleModel(req.db);

  // Check if role already exists in the specified database
  const existingRole = await Role.findOne({ name });
  if (existingRole) {
    return res.status(400).json({
      success: false,
      message: `Role with the name "${name}" already exists.`,
    });
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

const receiveRoles = catchAsync(async (req, res) => {
  const Role = getRoleModel(req.db);
  const roles = await Role.find({});

  return res.status(200).json({
    success: true,
    message: "Roles fetched successfully",
    data: roles,
  });
});
export { createRole, receiveRoles };
