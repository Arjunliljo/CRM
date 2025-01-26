import express from "express";

import {
  addUser,
  updateUser,
  deleteUser,
  getAllUsers,
} from "../Controllers/userController.js";
const router = express.Router();

// User or staff cruds - admin only will do
router.post("/", addUser);
router.get("/", getAllUsers);
router.patch("/", updateUser);
router.delete("/:id", deleteUser);

export default router;
