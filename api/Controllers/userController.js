import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory.js";
import User from "../Models/userModel.js";

const addUser = createOne(User);
const getUser = getOne(User);
const updateUser = updateOne(User);
const deleteUser = deleteOne(User);
const getAllUsers = getAll(User,['branches','countries','statuses','tabs','roles','role']);

export { addUser, getUser, updateUser, deleteUser, getAllUsers };
