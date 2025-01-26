import University from "../Models/universityModel.js";

import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory.js";

const createUniversity = createOne(University);
const updateUniversity = updateOne(University);
const deleteUniversity = deleteOne(University);
const getUniversity = getOne(University);
const getAllUniversity = getAll(University);

export {
  createUniversity,
  updateUniversity,
  deleteUniversity,
  getUniversity,
  getAllUniversity,
};
