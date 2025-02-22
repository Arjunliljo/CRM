import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../Controllers/handlerFactory.js";
import Application from "../Models/ApplicationModel.js"

const createApplication = createOne(Application);
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