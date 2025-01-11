import getCountryModel from "../Models/countriesModel.js";
import { isValidString, sanitizeInput } from "../Utilities/validation.js";

const createCountry = async (req, res, next) => {
  try {
    let { name, code, flag } = req.body;

    // Sanitize
    name = sanitizeInput(name);
    code = sanitizeInput(code);

    // Validate
    if (!isValidString(name, { min: 2, max: 30 })) {
      return res.status(400).json({
        success: false,
        message:
          "Country name must be at least 3 characters long and contain no unsafe characters.",
      });
    }
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
      return res.status(400).json({
        success: false,
        message: `This country already exists.`,
        db: req.db.dbName,
      });
    }

    const newCountry = await Country.create({ name, flag, code });
    res.status(201).json({
      success: true,
      data: newCountry,
      message: "New country created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the country",
      error: err.message,
    });
  }
};
export { createCountry };
