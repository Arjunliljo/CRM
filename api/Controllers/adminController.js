import Branch from "../Models/branchModel.js";
import { connectToUserAdminDb } from "../middlewares/dynamicDbContext.js";
// import { getBranchModel } from "../Models/branchModel.js";
import Country from "../Models/countriesModel.js";
import Role from "../Models/roleModel.js";
import User from "../Models/userModel.js";
import {
  isValidString,
  sanitizeInput,
  validateObjectId,
} from "../Utilities/validation.js";
import bcrypt from "bcrypt";
import getBranchModel from "../Models/branchModel.js";

const createRole = async (req, res) => {
  try {
    let { name, description } = req.body;

    // Inputs sanitization and validation
    name = sanitizeInput(name);
    description = sanitizeInput(description);

    if (!isValidString(name, { min: 2, max: 50 })) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid name: must be at least 3 characters long and not contain malicious content.",
      });
    }

    // Create a new role instance
    const newRole = new Role({
      name,
      description,
    });

    // Save the role to the database
    const savedRole = await newRole.save();

    // Send a success response
    return res.status(201).json({
      success: true,
      message: "Role created successfully",
      data: savedRole,
    });
  } catch (error) {
    // Handle errors and send a response
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the role",
      error: error.message,
    });
  }
};

// const createBranch = async (req, res, next) => {
//   try {
//     let { name } = req.body;
//     let db = req.db;
//     console.log(db);

//     // Sanitize
//     name = sanitizeInput(name);

//     // Validate
//     if (!isValidString(name, { min: 2, max: 50 })) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Branch name must be at least 3 characters long and contain no unsafe characters.",
//       });
//     }

//     // Check if the branch already exists
//     const existingBranch = await Branch.findOne({ name });
//     if (existingBranch) {
//       return res.status(400).json({
//         success: false,
//         message: `Branch with the name ${name} already exists.`,
//       });
//     }

//     const newBranch = await Branch.create({ name });
//     res.status(201).json({
//       success: true,
//       message: "Branch created successfully",
//       data: newBranch,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred while creating the branch",
//       error: err.message,
//     });
//   }
// };


const createBranch = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(req.db.dbName, "db");

    // Validate and sanitize input
    const sanitizedName = sanitizeInput(name);
    if (!isValidString(sanitizedName, { min: 2, max: 50 })) {
      return res.status(400).json({
        message: "Branch name must be valid and at least 2 characters long.",
      });
    }

    // Dynamically get the Branch model for the current database connection
    const Branch = getBranchModel(req.db);

    // Check if branch already exists in the specified database
    const existingBranch = await Branch.findOne({ name: sanitizedName });
    if (existingBranch) {
      return res.status(400).json({
        message: `Branch with the name "${sanitizedName}" already exists.`,
      });
    }

    // Create new branch in the correct database
    const newBranch = await Branch.create({ name: sanitizedName });

    res.status(201).json({
      message: "Branch created successfully",
      data: newBranch,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create branch",
      error: error.message,
    });
  }
};


const createCountries = async (req, res, next) => {
  try {
    let { name, code } = req.body;
    const flag = req.file ? req.file.filename : null;
    // Sanitize
    name = sanitizeInput(name);
    code = sanitizeInput(code);

    // Validate
    if (!isValidString(name, { min: 2, max: 30 })) {
      return res.status(400).json({
        success: false,
        message:
          "Country name must be at least 3 characters long and contain no unsafe characters.",
      });
    }
    // Check if the country code is valid
    if (!/^\d+$/.test(code.trim())) {
      return res.status(400).json({
        success: false,
        message: "Country code must be a valid number.",
      });
    }

    // Check if the country already exists
    const existingCountry = await Country.findOne({ name });
    if (existingCountry) {
      return res.status(400).json({
        success: false,
        message: `This country already exists.`,
      });
    }

    const newCountry = await Country.create({ name, flag, code });
    res.status(201).json({
      success: true,
      data: newCountry,
      message: "New country created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the country",
      error: err.message,
    });
  }
};

const addUser = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      role,
      count,
      employeeId,
      Address,
      autoAssign,
      status,
      branch,
      country,
    } = req.body;
    let image = req.file.filename;
    // Sanitize inputs and validations are done in db schema
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      phone: sanitizeInput(phone),
      password: sanitizeInput(password),
      count: sanitizeInput(count),
      image: sanitizeInput(image),
      employeeId: sanitizeInput(employeeId),
      Address: sanitizeInput(Address),
      autoAssign: sanitizeInput(autoAssign),
    };

    // Validate ObjectId fields (role, status, etc.)
    if (role && !validateObjectId(role)) {
      return res.status(400).send({ message: "Invalid role ID format" });
    }
    if (status && !validateObjectId(status)) {
      return res.status(400).send({ message: "Invalid status ID format" });
    }
    if (branch && !validateObjectId(branch)) {
      return res.status(400).send({ message: "Invalid branch ID format" });
    }
    if (country && !validateObjectId(country)) {
      return res.status(400).send({ message: "Invalid country ID format" });
    }

    // Create the user
    const newUser = new User({
      name: sanitizedData.name,
      email: sanitizedData.email.toLowerCase(),
      phone: sanitizedData.phone,
      password: sanitizedData.password,
      count: sanitizedData.count,
      image: image,
      employeeId: sanitizedData.employeeId,
      Address: sanitizedData.Address,
      autoAssign,
      // status,
      branch,
      country,
      role,
    });

    // Save to database
    const savedUser = await newUser.save();

    // Respond with success
    return res.status(201).json({
      success: true,
      message: "User added successfully.",
      data: savedUser,
    });
  } catch (error) {
    console.error("Error adding user:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while adding the user.",
    });
  }
};

const changePasswordByAdmin = async (req, res) => {
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
    console.error("Error changing password:", error);
    return res.status(500).json({
      success: false,
      message: `Failed to change password: ${error.message}`,
    });
  }
};

// const createBranch = async (req, res, next) => {
//   try {
//     let { name } = req.body;
//     const dbConnection = await connectToUserAdminDb(adminId);
//     const Branch = getBranchModel(dbConnection);

//     // Sanitize
//     name = sanitizeInput(name);

//     // Validate
//     if (!isValidString(name, { min: 2, max: 50 })) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Branch name must be at least 3 characters long and contain no unsafe characters.",
//       });
//     }

//     // Check if the branch already exists
//     const existingBranch = await Branch.findOne({ name });
//     if (existingBranch) {
//       return res.status(400).json({
//         success: false,
//         message: `Branch with the name ${name} already exists.`,
//       });
//     }

//     const newBranch = await Branch.create({ name });
//     res.status(201).json({
//       success: true,
//       message: "Branch created successfully",
//       data: newBranch,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred while creating the branch",
//       error: err.message,
//     });
//   }
// };

export {
  createRole,
  createBranch,
  createCountries,
  addUser,
  changePasswordByAdmin,
};
