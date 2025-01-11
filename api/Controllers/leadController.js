const createLead = async (req, res) => {
  try {
    let {
      name,
      email,
      phone,
      campaign,
      branch,
      status,
      remark,
      user,
      previousCounsellors,
      countries,
    } = req.body;

    // Sanitize inputs
    name = sanitizeInput(name);
    email = sanitizeInput(email);
    phone = sanitizeInput(phone);
    campaign = sanitizeInput(campaign);
    remark = remark ? sanitizeInput(remark) : remark;

    // Validate inputs
    if (!isValidString(name, { min: 2, max: 50 })) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid name: must be at least 2 characters long and not contain malicious content.",
      });
    }

  
    if (!isValidString(campaign, { min: 2, max: 50 })) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid campaign: must be at least 2 characters long and not contain malicious content.",
      });
    }

    if (remark && !isValidString(remark, { min: 3, max: 100 })) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid remark: must be between 3 and 100 characters long, if provided.",
      });
    }

    // Dynamically get the Lead model for the current database connection
    const Lead = getLeadModel(req.db);

    // Check if a lead with the same email or phone already exists
    const existingLead = await Lead.findOne({ email });
    if (existingLead) {
      return res.status(400).json({
        success: false,
        message: `A lead with the email "${email}" already exists.`,
      });
    }

    // Create a new lead in the correct database
    const newLead = await Lead.create({
      name,
      email,
      phone,
      campaign,
      branch,
      status,
      remark,
      user,
      previousCounsellors,
      countries,
    });

    // Send a success response
    return res.status(201).json({
      success: true,
      message: "Lead created successfully",
      data: newLead,
    });
  } catch (error) {
    // Handle errors and send a response
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the lead",
      error: error.message,
    });
  }
};

export { createLead };
