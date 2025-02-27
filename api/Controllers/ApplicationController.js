import APIFeatures from "../APIFeatures/APIFeatures.js";
import {
  createOne,
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

  const newApplication = await Application.create(req.body);

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

export {
  createApplication,
  getAllApplications,
  getApplication,
  updateApplication,
  deleteApplication,
};
