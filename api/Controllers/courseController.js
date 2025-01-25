import Country from "../Models/countryModel.js";
import Course from "../Models/courseModal.js";
import AppError from "../Utilities/appError.js";
import catchAsync from "../Utilities/catchAsync.js";
import { sanitizeInput } from "../Utilities/validation.js";

const createCourse = catchAsync(async (req, res, next) => {
  let { course, fees, qualification, status, remark } = req.body;

  // Sanitize and validate inputs
  course = sanitizeInput(course);
  fees = sanitizeInput(fees);
  qualification = sanitizeInput(qualification);
  status = sanitizeInput(status);
  remark = sanitizeInput(remark);

  // create new course
  const newCourse = await Course.create({
    course,
    fees,
    qualification,
    status,
    remark
  });
  if (!newCourse) return next(new AppError("Failed to create Course", 400));

  return res.status(201).json({
    success: true,
    message: "Course created successfully",
    data: newCourse,
  });
});
export { createCourse };
