import express from "express";

import {
  updateUser,
  deleteUser,
  getAllUsers,
  
} from "../Controllers/userController.js";
import { createUser , loginUser } from "../Controllers/authController.js";
const router = express.Router();

// User or staff cruds - admin only will do
router.post("/create", createUser);
router.get("/", getAllUsers);
router.patch("/", updateUser);
router.delete("/:id", deleteUser);
router.post("/login",loginUser)

export default router;