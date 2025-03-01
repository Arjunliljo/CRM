import express from "express";

import {
  updateUser,
  deleteUser,
  getAllUsers,
  getUser,
} from "../Controllers/userController.js";

import {
  createUser,
  loginUser,
  logout,
  verify,
} from "../Controllers/authController.js";
import  upload  from "../middlewares/uploadMiddlware.js";
const router = express.Router();

router.post("/verify", verify);

// User or staff cruds - admin only will do
router.post("/create", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.patch("/:id", upload, updateUser);
router.delete("/:id", deleteUser);
router.post("/login", loginUser);
router.post("/logout", logout);

export default router;
