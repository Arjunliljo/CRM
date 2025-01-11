import getStatusModel from "../Models/statusModel.js";

const receiveAllStatus = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve statuses",
      error: error.message,
    });
  }
};

const createStatus = async (req, res) => {
  try {
    const { status, isTab, subStatus, statusClass, description } = req.body;

    // Validate and sanitize input
    const sanitizedName = sanitizeInput(name);
    if (!isValidString(sanitizedName, { min: 2, max: 50 })) {
      return res.status(400).json({
        message: "Status name must be valid and at least 2 characters long.",
      });
    }

    // Validate status array
    if (
      !Array.isArray(status) ||
      !status.every((substatus) =>
        isValidString(substatus, { min: 1, max: 50 })
      )
    ) {
      return res.status(400).json({
        message:
          "Each substatus must be a valid string and at least 1 character long.",
      });
    }

    // Validate description
    if (description && !isValidString(description, { min: 3, max: 100 })) {
      return res.status(400).json({
        message: "Description must be between 3 and 100 characters.",
      });
    }

    // Dynamically get the Status model for the current database connection
    const Status = getStatusModel(req.db);

    const existingStatus = await Status.findOne({ name: sanitizedName });
    if (existingStatus) {
      return res.status(400).json({
        message: `Status with the name "${sanitizedName}" already exists.`,
      });
    }

    // Create new status in the correct database
    const newStatus = await Status.create({
      name: sanitizedName,
      status,
      isTab,
      class: statusClass,
      subStatus,
      description,
    });

    res.status(201).json({
      message: "Status created successfully",
      data: newStatus,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create status",
      error: error.message,
    });
  }
};

export { createStatus, receiveAllStatus };
