import getBranchModel from "../Models/branchModel.js";
import Lead from "../Models/leadsModel.js";
import getLeadModel from "../Models/leadsModel.js";
import Status from "../Models/statusModel.js";
import getStatusModel from "../Models/statusModel.js";

import getUserModel from "../Models/userModel.js";
import AppError from "../Utilities/appError.js";
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

const uploadLeadFile = catchAsync(async (req, res) => {
  if (!req.s3File) {
    return res.status(400).json({
      success: false,
      message: "No file upload details found",
    });
  }

  const { fileUrl, fileName } = req.s3File;
  const { leadId, content, isImportant } = req.body;
  console.log(req.s3File, "req.s3File");

  // First check if lead exists
  const lead = await Lead.findById(leadId);
  console.log(lead, "lead");

  if (!lead) {
    return res.status(404).json({
      success: false,
      message: "Lead not found",
    });
  }

  // Validate required fields
  if (!content || !fileName || !fileUrl) {
    return res.status(400).json({
      success: false,
      message: "Missing required document fields",
    });
  }

  const documentData = {
    name: content,
    filename: fileName,
    url: fileUrl,
    isImportant: isImportant === "true",
  };

  const updatedLead = await Lead.findByIdAndUpdate(
    leadId,
    {
      $push: { documents: documentData },
    },
    { new: true }
  );

  console.log(updatedLead, "updatedLead");
  if (!updatedLead) {
    return res.status(404).json({
      success: false,
      message: "Lead not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "File uploaded successfully",
    data: updatedLead.documents,
  });
});

const deleteLeadDocument = catchAsync(async (req, res) => {
  const { leadId, documentObj } = req.body;

  await Lead.findByIdAndUpdate(leadId, {
    $pull: { documents: { name: documentObj.name } },
  });

  return res.status(200).json({
    success: true,
    message: "File deleted successfully",
  });
});

const updateLeadDocuments = catchAsync(async (req, res) => {
  const { leadId, documentObj } = req.body;

  const updatedLead = await Lead.findOneAndUpdate(
    { _id: leadId, "documents._id": documentObj._id },
    {
      $set: {
        "documents.$.name": documentObj.name,
        "documents.$.isImportant": documentObj.isImportant,
      },
    },
    { new: true }
  );

  return res.status(200).json({
    success: true,
    message: "Document updated successfully",
    data: updatedLead.documents,
  });
});

const updateLeadRemark = catchAsync(async (req, res) => {
  const { leadId, remark } = req.body;
  await Lead.findByIdAndUpdate(leadId, { remark });
  return res.status(200).json({
    success: true,
    message: "Remark updated successfully",
  });
});

const updateLeadPersonalDetails = catchAsync(async (req, res) => {
  const { leadId, details } = req.body;
  console.log(details, "details");

  const updatedLead = await Lead.findByIdAndUpdate(
    leadId,
    {
      name: details.name,
      phone: details.phone,
      email: details.email,
      address: details.address,
    },
    { new: true }
  );
  console.log("updatedLead", updatedLead);
  return res.status(200).json({
    success: true,
    message: "Personal details updated successfully",
    // data: updatedLead,
  });
});

const updateLeadStatus = catchAsync(async (req, res) => {
  const { leadId } = req.body;
  const updatedLead = await Lead.findByIdAndUpdate(leadId, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: true,
    message: "Lead status updated successfully",
    data: updatedLead,
  });
});

const updateLead = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const updatedLead = await Lead.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedLead) {
    return next(new AppError("Failed to update Lead", 400));
  }

  return res.status(200).json({
    success: true,
    message: "Lead updated successfully",
    data: updatedLead,
  });
});

export {
  createLead,
  branchLeadAssignment,
  getAllLeads,
  uploadLeadFile,
  updateLeadDocuments,
  deleteLeadDocument,
  updateLeadRemark,
  updateLead,
  updateLeadPersonalDetails,
  updateLeadStatus,
};
