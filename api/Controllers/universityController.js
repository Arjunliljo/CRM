import Country from "../Models/countryModel.js";
import Course from "../Models/courseModal.js";
import University from "../Models/universityModel.js";
import AppError from "../Utilities/appError.js";
import catchAsync from "../Utilities/catchAsync.js";
import { sanitizeInput } from "../Utilities/validation.js";

const createUniversity = catchAsync(async (req, res, next) => {
  let { name, countryId, qualification } = req.body;

  // Sanitize and validate inputs
  name = sanitizeInput(name);
  qualification = sanitizeInput(qualification);

  //check country
  const existingCountry = await Country.findById(countryId);
  if (!existingCountry) {
    return next(new AppError("Invalid country ID, country not found", 400));
  }
  // create new university
  const newUniversity = await University.create({
    university:name,
    country: countryId,
    qualification,
  });
  if (!newUniversity)
    return next(new AppError("Failed to create University", 400));

  return res.status(201).json({
    success: true,
    message: "University created successfully",
    data: newUniversity,
  });
});
export { createUniversity };
