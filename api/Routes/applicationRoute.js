import express from "express";

import { createApplication, getAllApplications, getApplication, updateApplication, deleteApplication } from "../Controllers/ApplicationController.js";

const router = express.Router();

router.post("/", createApplication);
router.get("/", getAllApplications);
router.get("/:id", getApplication);
router.patch("/:id", updateApplication);
router.delete("/:id", deleteApplication);

export default router;
