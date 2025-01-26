import Branch from "../Models/branchModel.js";

import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory.js";

const createBranch = createOne(Branch);
const getAllBranches = getAll(Branch);
const getBranch = getOne(Branch);
const updateBranch = updateOne(Branch);
const deleteBranch = deleteOne(Branch);

export { createBranch, getAllBranches, getBranch, deleteBranch, updateBranch };
