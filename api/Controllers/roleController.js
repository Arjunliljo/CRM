import Role from "../Models/roleModel.js";

import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory.js";

const createRole = createOne(Role);
const getRole = getOne(Role);
const getAllRoles = getAll(Role);
const updateRole = updateOne(Role);
const deleteRole = deleteOne(Role);

export { createRole, getAllRoles, getRole, updateRole, deleteRole };
