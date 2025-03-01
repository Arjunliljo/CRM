import APIFeatures from "../../APIFeatures/APIFeatures.js";
import Course from "../../Models/University/courseModel.js";
import Qualification from "../../Models/University/qualifications.js";
import University from "../../Models/University/universityModel.js";
import catchAsync from "../../Utilities/catchAsync.js";

import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../handlerFactory.js";

const createUniversity = createOne(University);
const updateUniversity = updateOne(University);
const deleteUniversity = deleteOne(University);
const getUniversity = getOne(University);

const getAllUniversity = catchAsync(async (req, res, next) => {
  let filter = {};
  const features = new APIFeatures(
    University,
    University.find(filter),
    req.query
  );

  features
    .filter()
    .sort()
    .limitFields()
    .paginate(await University.countDocuments())
    .filterByBranch()
    .filterByDateRange()
    .search()
    .userFilter();

  let universities = await features.query;

  res.status(200).json({
    status: "success",
    data: universities,
  });
});

const createQualification = createOne(Qualification);
const updateQualification = updateOne(Qualification);
const deleteQualification = deleteOne(Qualification);
const getQualification = getOne(Qualification);
const getAllQualification = getAll(Qualification);

const createCourse = createOne(Course);
const updateCourse = updateOne(Course);
const deleteCourse = deleteOne(Course);
const getCourse = getOne(Course);
const getAllCourse = getAll(Course, ["university"]);

export {
  createUniversity,
  updateUniversity,
  deleteUniversity,
  getUniversity,
  getAllUniversity,
  createQualification,
  updateQualification,
  deleteQualification,
  getQualification,
  getAllQualification,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourse,
  getAllCourse,
};
