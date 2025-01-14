import express from "express";

import {
  addUser,
  dropUser,
  getUsers,
  userGroup,
  updateUser,
} from "../Controllers/userController.js";
const router = express.Router();

// User or staff cruds - admin only will do
router.post("/", addUser);
router.get("/", getUsers);
router.patch("/", updateUser);
router.delete("/:id", dropUser);

router.post("/userGroup", userGroup);

export default router;
