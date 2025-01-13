import { sanitizeInput, validateObjectId } from "../Utilities/validation.js";
import bcrypt from "bcryptjs";
import getUserModel from "../Models/userModel.js";
import getGroupModel from "../Models/userGroupModel.js";
import getBranchModel from "../Models/branchModel.js";
import getRoleModel from "../Models/roleModel.js";
import getStatusModel from "../Models/statusModel.js";
import catchAsync from "../Utilities/catchAsync.js";
import mongoose from "mongoose";

const addUser = catchAsync(async (req, res) => {
  const {
    name,
    email,
    phone,
    password,
    role,
    employeeId,
    Address,
    autoAssign,
    status,
    branch,
    country,
    image,
  } = req.body;

  // Sanitize inputs
  const sanitizedData = {
    name: sanitizeInput(name),
    email: sanitizeInput(email),
    phone: sanitizeInput(phone),
    employeeId: sanitizeInput(employeeId),
    Address: sanitizeInput(Address),
  };

  // Validate ObjectId fields (role, status, branch, country)
  if (role && !validateObjectId(role)) {
    return res.status(400).send({ message: "Invalid role ID format" });
  }
  if (status && !validateObjectId(status)) {
    return res.status(400).send({ message: "Invalid status ID format" });
  }

  if (country && !validateObjectId(country)) {
    return res.status(400).send({ message: "Invalid country ID format" });
  }

  // To avoid confusing leads about which branch they belong to.
  // Check if autoAssign is true and branch length is more than 1
  if (autoAssign === true && branch.length > 1) {
    return res.status(400).send({
      message: "autoAssign can only be true when branch length is 1.",
    });
  }

  // Dynamically retrieve User model based on the database connection
  const User = getUserModel(req.db);

  // Create the user
  const newUser = new User({
    name: sanitizedData.name,
    email: sanitizedData.email.toLowerCase(),
    phone: sanitizedData.phone,
    password: password,
    employeeId: sanitizedData.employeeId,
    Address: sanitizedData.Address,
    autoAssign: autoAssign,
    status,
    branch,
    country,
    role,
    image,
  });

  // Save to database
  const savedUser = await newUser.save();

  // Respond with success
  return res.status(201).json({
    success: true,
    message: "User added successfully.",
    data: savedUser,
  });
});

const changeUserPassword = catchAsync(async (req, res) => {
  let userId = req.params.id;
  const { newPassword } = req.body;
  try {
    // Input validation
    if (!userId || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "User ID and new password are required",
      });
    }
    const User = getUserModel(req.db);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password and change password date
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        password: hashedPassword,
        changePasswordDate: new Date(),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    // Remove sensitive info before returning
    updatedUser.password = undefined;

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to change password: ${error.message}`,
    });
  }
});

const userGroup = catchAsync(async (req, res) => {
  try {
    const { name, description, branch, users, createdBy } = req.body;

    // Dynamically get the Group model based on the db connection
    const Group = getGroupModel(req.db);

    // to validate user branches
    const User = getUserModel(req.db);

    // checking the branch
    const usersData = await User.find({ _id: { $in: users } });

    // Check if all users are from the same branch
    const areSameBranch = usersData.every(
      (user) => user.branch.toString() === branch.toString()
    );

    if (!areSameBranch) {
      return res.status(400).json({
        success: false,
        message: "All users must belong to the same branch as the group.",
      });
    }

    const newGroup = new Group({
      name,
      description,
      branch,
      users,
      createdBy,
    });

    // Save the group
    const savedGroup = await newGroup.save();

    return res.status(201).json({
      success: true,
      message: "Group created successfully.",
      data: savedGroup,
    });
  } catch (error) {
    console.error("Error creating group:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the group.",
    });
  }
});

const receiveUsers = catchAsync(async (req, res) => {
  // Create a database connection for User and Branch models
  const dbConnection = req.db;

  // Register models with the current database connection if not already registered
  getUserModel(dbConnection);
  getBranchModel(dbConnection);
  getRoleModel(dbConnection);
  getStatusModel(dbConnection);

  const User = getUserModel(dbConnection); // Use the dbConnection

  // Fetch users and populate the related fields
  const users = await User.find({})
    .populate("role") // Populate the `role` field
    .populate("branch") // Populate the `branch` field (array of branches)
    .populate("status") // Populate the `status` field
    .populate("country"); // Populate the `country` field

  return res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    data: users,
  });
});

const dropUser = catchAsync(async (req, res) => {
  const userId = req.params.id; // Get user ID from the URL params

  // Create a database connection
  const dbConnection = req.db || mongoose.connection;

  // Register the User model with the current database connection if not already registered
  const User = getUserModel(dbConnection);

  // Find and delete the user by their ID
  const deletedUser = await User.findByIdAndDelete(userId);

  if (!deletedUser) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "User deleted successfully",
    data: deletedUser,
  });
});

export { addUser, changeUserPassword, userGroup, receiveUsers, dropUser };
