import Country from "../Models/countryModel.js";
import AppError from "../Utilities/appError.js";
import catchAsync from "../Utilities/catchAsync.js";
import { sanitizeInput } from "../Utilities/validation.js";

const createCountry = catchAsync(async (req, res, next) => {
  let { name, description } = req.body;

  // Sanitize
  name = sanitizeInput(name);
  description = sanitizeInput(description);
  description = sanitizeInput(description);

  const newCountry = await Country.create({ name, description });

  if (!newCountry) return next(new AppError("Failed to create country", 400));

  res.status(201).json({
    success: true,
    message: "New country created successfully",
    data: newCountry,
  });
});

const getAllCountries = catchAsync(async (req, res) => {
  const countries = await Country.find({});
  return res.status(200).json({
    success: true,
    message: "Countries fetched successfully",
    data: countries,
  });
});

const getCountry = catchAsync(async (req, res) => {
  const country = await Country.findById(req.params.id);

  return res.status(200).json({
    success: true,
    message: "Country fetched successfully",
    data: country,
  });
});

const updateCountry = catchAsync(async (req, res) => {
  const country = await Country.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: true,
    message: "Country updated successfully",
    data: country,
  });
});

const deleteCountry = catchAsync(async (req, res) => {
  const country = await Country.findByIdAndDelete(req.params.id);

  return res.status(200).json({
    success: true,
    message: "Country deleted successfully",
    data: country,
  });
});

export {
  createCountry,
  getAllCountries,
  getCountry,
  updateCountry,
  deleteCountry,
};
