import {
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../Controllers/handlerFactory.js";
import Application from "../Models/ApplicationModel.js";
import Lead from "../Models/leadsModel.js";
import AppError from "../Utilities/appError.js";
import catchAsync from "../Utilities/catchAsync.js";

const createApplication = catchAsync(async (req, res, next) => {
  const lead = await Lead.findById(req.body.lead);

  if (!lead) {
    return next(new AppError("Lead not found", 404));
  }

  const newApplication = new Application(req.body);
  await newApplication.save();

  if (!newApplication) {
    return next(new AppError("Application not created", 400));
  }

  lead.isStudent = true;
  lead.application.push(newApplication._id);
  await lead.save();

  res.status(201).json({
    status: "success",
    data: newApplication,
  });
});

const getAllApplications = getAll(Application);
const getApplication = getOne(Application);
const updateApplication = updateOne(Application);
const deleteApplication = deleteOne(Application);

const updateDocuments = catchAsync(async (req, res, next) => {
  if (!req.s3File) {
    return res.status(400).json({
      success: false,
      message: "No file upload details found",
    });
  }

  const { fileUrl, fileName } = req.s3File;
  const { content, isImportant } = req.body;
  const { id } = req.params;

  const application = await Application.findById(id);

  if (!application) {
    return next(new AppError("Application not found", 404));
  }

  const documentData = {
    name: content,
    filename: fileName,
    url: fileUrl,
    isImportant: isImportant === "true",
  };

  application.documents.push(documentData);
  await application.save();

  res.status(200).json({
    status: "success",
    data: application,
  });
});

export {
  createApplication,
  getAllApplications,
  getApplication,
  updateApplication,
  deleteApplication,
  updateDocuments,
};
