import Country from "../Models/countryModel.js";

import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory.js";

const createCountry = createOne(Country);
const getCountry = getOne(Country);
const getAllCountries = getAll(Country);
const updateCountry = updateOne(Country);
const deleteCountry = deleteOne(Country);

export {
  createCountry,
  getAllCountries,
  updateCountry,
  deleteCountry,
  getCountry,
};
