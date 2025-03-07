import Status from "../Models/statusModel.js";

import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
  substatusDelete,
} from "./handlerFactory.js";

const createStatus = createOne(Status);
const getStatus = getOne(Status);
const updateStatus = updateOne(Status);
const deleteStatus = deleteOne(Status);
const getAllStatus = getAll(Status);
const deleteSubStatus = substatusDelete(Status);

export {
  createStatus,
  getAllStatus,
  getStatus,
  updateStatus,
  deleteStatus,
  deleteSubStatus,
};
