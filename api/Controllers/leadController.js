import getBranchModel from "../Models/branchModel.js";
import Lead from "../Models/leadsModel.js";
import getLeadModel from "../Models/leadsModel.js";
import Status from "../Models/statusModel.js";
import getStatusModel from "../Models/statusModel.js";

import getUserModel from "../Models/userModel.js";
import catchAsync from "../Utilities/catchAsync.js";
import { sanitizeInput } from "../Utilities/validation.js";

const createLead = catchAsync(async (req, res) => {
  let { name, email, phone, campaign, countries } = req.body;

  // Sanitize inputs
  name = sanitizeInput(name);
  email = sanitizeInput(email);
  phone = sanitizeInput(phone);
  campaign = sanitizeInput(campaign);

  // Determine remark based on whether a country is specified
  let remark =
    "Lead interested in abroad but has not specified a country. Follow-up needed for more details.";

  if (countries && countries.length > 0) {
    remark = `Lead interested in abroad with preference for the countries: ${countries.join(
      ", "
    )}. Follow-up needed for more details.`;
  }

  remark = remark ? sanitizeInput(remark) : remark;
  // const Lead = getLeadModel(req.db);
  // const Status = getStatusModel(req.db);

  // Check if a lead with the same email already exists
  const existingLead = await Lead.findOne({ email });
  if (existingLead) {
    return res.status(400).json({
      success: false,
      message: `A lead with the email "${email}" already exists.`,
    });
  }

  // Get the first status from the Status schema
  const statuses = await Status.find({});
  if (statuses.length === 0) {
    return res.status(400).json({
      success: false,
      message: "No statuses found in the system.",
    });
  }
  const firstStatusId = statuses[0]._id; // First status ID

  // Create a new lead with the first status ID included
  const newLead = await Lead.create({
    name,
    email,
    phone,
    campaign,
    remark,
    countries,
    isStudent: false,
    status: [firstStatusId],
  });

  // Send a success response
  return res.status(201).json({
    success: true,
    message: "Lead created successfully",
    data: newLead,
  });
});

const getAllLeads = catchAsync(async (req, res) => {
  // Fetch leads and populate all status IDs
  const leads = await Lead.find({})
    .populate("status") // Populates the `status` array
    .populate("branch") // Populate other fields as needed
    .populate("helpers")
    .populate("countries");

  return res.status(200).json({
    success: true,
    message: "Leads fetched successfully",
    data: leads,
  });
});

const branchLeadAssignment = catchAsync(async (req, res) => {
  const Branch = getBranchModel(req.db);
  const Lead = getLeadModel(req.db);
  const Status = getStatusModel(req.db);

  // Fetch all branches
  const branches = await Branch.find();
  if (!branches.length) {
    throw new Error("No branches available to assign leads.");
  }

  // Fetch all leads that are
  // * not yet assigned to branches
  // * and where isStudent is false
  const unassignedLeads = await Lead.find({ branch: null, isStudent: false });
  console.log(unassignedLeads, "unassignedLeads");

  if (!unassignedLeads.length) {
    throw new Error("No unassigned leads available.");
  }

  // Fetch the second status
  const statuses = await Status.find({});
  if (statuses.length < 2) {
    return res.status(400).json({
      success: false,
      message:
        "Not enough statuses found to assign to leads, create some status",
    });
  }
  const secondStatusId = statuses[1]._id; // Second status ID

  // Distribute leads among branches
  let branchIndex = 0;
  for (const lead of unassignedLeads) {
    // Assign the lead to the next branch in the list
    const branch = branches[branchIndex];
    lead.branch = branch._id;

    // Push the second status into the status array
    if (!lead.status.includes(secondStatusId._id)) {
      lead.status.push(secondStatusId._id);
    }

    // Update other fields
    lead.isStudent = true;
    lead.remark = "Leads are assigned to each branch";

    // Save the updated lead
    await lead.save();

    // Move to the next branch
    branchIndex = (branchIndex + 1) % branches.length;
  }
  console.log("Leads successfully assigned to branches.");

});


const assignLeadsToUsers = catchAsync(async (req, res) => {
  const User = getUserModel(req.db);
  const Lead = getLeadModel(req.db);
  const Status = getStatusModel(req.db);

  // Get the second status from the Status schema
  const statuses = await Status.find({});
  if (statuses.length < 2) {
    return res.status(400).json({
      success: false,
      message:
        "Not enough statuses found to assign to leads, create some status",
    });
  }
  const secondStatusId = statuses[1]._id; // Second status ID

  // Get all eligible users with `isLeadsAssign` set to true and only one branch
  const eligibleUsers = await User.find({
    isLeadsAssign: true,
  })
    .populate("branch")
    .exec();

  const singleBranchUsers = eligibleUsers.filter(
    (user) => Array.isArray(user.branch) && user.branch.length === 1
  );

  if (singleBranchUsers.length === 0) {
    return res.status(400).json({
      success: false,
      message:
        "No eligible users were found for lead assignment. Ensure that there are users with the ability to receive leads",
    });
  }

  // Get all leads with `isLead` set to true
  const leadsToAssign = await Lead.find({ isLead: true });

  if (leadsToAssign.length === 0) {
    return res.status(400).json({
      success: false,
      message: "No leads available for assignment.",
    });
  }

  // Distribute leads among eligible users
  const userCount = singleBranchUsers.length;
  for (let i = 0; i < leadsToAssign.length; i++) {
    const lead = leadsToAssign[i];
    const user = singleBranchUsers[i % userCount]; // Cycle through users

    // Update lead details
    lead.isLead = false;
    lead.branch = user.branch[0]._id; // Assign the user's single branch
    lead.status = lead.status || [];
    lead.status.push(secondStatusId); // Add second status to the status array

    // Save the updated lead
    await lead.save();
  }

  return res.status(200).json({
    success: true,
    message: "Leads have been successfully distributed among users.",
  });
});


const uploadLeadFile = catchAsync(async (req, res) => {

  if (!req.s3File) {
    return res.status(400).json({
      success: false,
      message: "No file upload details found"
    });
  }

  const { fileName, fileId, fileUrl } = req.s3File;

  return res.status(200).json({
    success: true,
    message: "File uploaded successfully",
    data: { fileName, fileId, fileUrl }
  });
});


export { createLead, branchLeadAssignment, assignLeadsToUsers ,getAllLeads , uploadLeadFile};
