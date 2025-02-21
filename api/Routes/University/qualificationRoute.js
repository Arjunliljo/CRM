import express from "express";
import {
  createQualification,
  getAllQualification,
  getQualification,
  updateQualification,
  deleteQualification,
} from "../../Controllers/University/universityController.js";
const router = express.Router();

router.post("/", createQualification);
router.get("/", getAllQualification);
router.get("/:id", getQualification);
router.patch("/:id", updateQualification);
router.delete("/:id", deleteQualification);

export default router;
