import APIFeatures from "../APIFeatures/APIFeatures.js";
import Lead from "../Models/leadsModel.js";
import Status from "../Models/statusModel.js";
import Qualification from "../Models/University/qualifications.js";
import AppError from "../Utilities/appError.js";
import catchAsync from "../Utilities/catchAsync.js";
import { sanitizeInput } from "../Utilities/validation.js";
import { assignLeadsToUsers } from "./batch/batchAssigners.js";

const createLead = catchAsync(async (req, res) => {
  let { name, email, phone, campaign, countries, status, country } = req.body;

  // Sanitize inputs
  name = sanitizeInput(name);
  email = sanitizeInput(email);
  phone = sanitizeInput(phone);
  campaign = sanitizeInput(campaign);
  status = sanitizeInput(status);
  country = sanitizeInput(country);

  // Determine remark based on whether a country is specified
  let remark =
    "Lead interested in abroad but has not specified a country. Follow-up needed for more details.";

  if (countries && countries.length > 0) {
    remark = `Lead interested in abroad with preference for the countries: ${countries.join(
      ", "
    )}. Follow-up needed for more details.`;
  }

  remark = remark ? sanitizeInput(remark) : remark;

  // Check if a lead with the same email already exists
  const existingLead = await Lead.findOne({ email });
  if (existingLead) {
    return res.status(400).json({
      success: false,
      message: `A lead with the email "${email}" already exists.`,
    });
  }

  // Get the first status from the Status schema if no status provided
  let statusId = status;
  if (!status) {
    const statuses = await Status.find({});
    if (statuses.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No statuses found in the system.",
      });
    }
    statusId = statuses[0]._id;
  }

  // Create a new lead with status and countries
  const newLead = await Lead.create({
    name,
    email,
    phone,
    campaign,
    remark,
    countries: [country],
    isStudent: false,
    status: statusId,
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
  let filter = {};
  const features = new APIFeatures(Lead, Lead.find(filter), req.query);

  features
    .filter()
    .sort()
    .limitFields()
    .paginate(await Lead.countDocuments())
    .filterByBranch()
    .filterByDateRange()
    .search()
    .userFilter()
    .countryFilter();

  const leads = await features.query.populate({
    path: "qualification",
    model: "Qualification",
    strictPopulate: false,
  });

  return res.status(200).json({
    success: true,
    message: "Leads fetched successfully",
    data: leads,
  });
});

const leadToUserAssignment = catchAsync(async (req, res) => {
  await assignLeadsToUsers(req.body.leadIds, req.body.user);
  return res.status(200).json({
    success: false,
    message: "Successfully assigned leads to user",
  });
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

  // First check if lead exists
  const lead = await Lead.findById(leadId);

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

  console.log(leadId, documentObj, "leadId, documentObj");

  await Lead.findByIdAndUpdate(leadId, {
    $pull: { documents: { name: documentObj.name } },
  });
  console.log("updatedLead");

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

  const updatedLead = await Lead.findByIdAndUpdate(
    leadId,
    {
      name: details.name,
      phone: details.phone,
      email: details.email,
      address: details.address,
    },
    { new: true }
  ).populate("qualification");
  console.log("updatedLead", updatedLead);
  return res.status(200).json({
    success: true,
    message: "Personal details updated successfully",
    data: updatedLead,
  });
});

const updateLeadStatus = catchAsync(async (req, res) => {
  const { leadId, status, remark, country, followupDate } = req.body;
  const updatedLead = await Lead.findByIdAndUpdate(
    leadId,
    { status, remark, country, followupDate },
    { new: true }
  ).populate("qualification");
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

const addQualification = catchAsync(async (req, res) => {
  const { leadId, name, mark } = req.body;

  const createdQualification = await Qualification.create({ name, mark });
  const updatedLead = await Lead.findByIdAndUpdate(
    leadId,
    {
      $push: {
        qualification: { $each: [createdQualification._id], $position: 0 },
      },
    },
    { new: true }
  ).populate("qualification");
  return res.status(200).json({
    success: true,
    message: "Qualification added successfully",
    data: updatedLead,
  });
});

const removeQualification = catchAsync(async (req, res) => {
  const { leadId, qualificationId } = req.body;

  const updatedLead = await Lead.findByIdAndUpdate(
    leadId,
    { $pull: { qualification: qualificationId } },
    { new: true }
  ).populate("qualification");

  await Qualification.findByIdAndDelete(qualificationId);

  return res.status(200).json({
    success: true,
    message: "Qualification removed successfully",
    data: updatedLead,
  });
});

const editQualification = catchAsync(async (req, res) => {
  const { qualificationId, name, mark } = req.body;

  await Qualification.findByIdAndUpdate(
    qualificationId,
    { name, mark },
    { new: true }
  );

  const updatedLead = await Lead.findOne({
    qualification: qualificationId,
  }).populate("qualification");

  return res.status(200).json({
    success: true,
    message: "Qualification updated successfully",
    data: updatedLead,
  });
});

export {
  createLead,
  leadToUserAssignment,
  getAllLeads,
  uploadLeadFile,
  updateLeadDocuments,
  deleteLeadDocument,
  updateLeadRemark,
  updateLead,
  updateLeadPersonalDetails,
  updateLeadStatus,
  addQualification,
  removeQualification,
  editQualification,
};
