import express from "express";
import { createRole, receiveRoles } from "../Controllers/roleController.js";
const router = express.Router();


// Role cruds - admin only will do
router.post("/", createRole);
router.get("/", receiveRoles);
// router.put("/", protect, updateRole);
// router.delete("/", protect, dropRole);
export default router;
