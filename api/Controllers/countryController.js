import getCountryModel from "../Models/countriesModel.js";
import AppError from "../Utilities/appError.js";
import catchAsync from "../Utilities/catchAsync.js";
import { sanitizeInput } from "../Utilities/validation.js";

const createCountry = catchAsync(async (req, res, next) => {
  let { name, code, flag } = req.body;

  // Sanitize
  name = sanitizeInput(name);
  code = sanitizeInput(code);

  // Check if the country code is valid
  if (!/^\d+$/.test(code.trim())) {
    return res.status(400).json({
      success: false,
      message: "Country code must be a valid number.",
    });
  }

  // Dynamically get the Country model for the current database connection
  const Country = getCountryModel(req.db);

  // Check if the country already exists in the specified database
  const existingCountry = await Country.findOne({ name });
  if (existingCountry) {
    return next(new AppError(`This country already exists.`, 400));
  }

  const newCountry = await Country.create({ name, flag, code });
  if (!newCountry) return next(new AppError("Failed to create country", 400));

  res.status(201).json({
    success: true,
    data: newCountry,
    message: "New country created successfully",
  });
});
export { createCountry };
