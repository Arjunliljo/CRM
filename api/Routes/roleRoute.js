import express from "express";

import { createRole } from "../Controllers/roleController.js";
import { getAllRoles } from "../Controllers/roleController.js";
import { getRole } from "../Controllers/roleController.js";
import { updateRole } from "../Controllers/roleController.js";
import { deleteRole } from "../Controllers/roleController.js";
const router = express.Router();

router.get("/", getAllRoles);
router.get("/:id", getRole);
router.post("/", createRole);
router.patch("/:id", updateRole);
router.delete("/:id", deleteRole);

export default router;
