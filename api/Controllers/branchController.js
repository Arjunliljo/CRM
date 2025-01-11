import getBranchModel from "../Models/branchModel.js";
import { isValidString, sanitizeInput } from "../Utilities/validation.js";

const createBranch = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);

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

const receiveBranches = async (req, res) => {
  try {
    // Dynamically get the Branch model for the current database connection
    const Branch = getBranchModel(req.db);

    // Fetch all branches from the database
    const branches = await Branch.find();

    // Return the fetched branches in the response
    return res.status(200).json({
      success: true,
      message: "Branches retrieved successfully",
      data: branches,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve branches",
      error: error.message,
    });
  }
};

export { createBranch, receiveBranches };
