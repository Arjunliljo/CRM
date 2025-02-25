import express from "express";
// import { protect } from "../middlewares/auth.js";
import {
  createLead,
  getAllLeads,
  uploadLeadFile,
  updateLeadDocuments,
  deleteLeadDocument,
  updateLeadRemark,
  updateLeadPersonalDetails,
  updateLeadStatus,
  updateLead,
  addQualification,
  removeQualification,
  editQualification,
  leadToUserAssignment,
} from "../Controllers/leadController.js";
import upload from "../middlewares/uploadMiddlware.js";
import deleteFile from "../middlewares/deleteFile.js";
const router = express.Router();

// router.use(protect);

// router.put("/", updateLead);
// router.delete("/", dropLead);
router.post("/uploadLeadFile", upload, uploadLeadFile);
router.patch("/deleteLeadDocument", deleteFile, deleteLeadDocument);
router.patch("/updateLeadDocuments", updateLeadDocuments);
router.patch("/updateLeadRemark", updateLeadRemark);
router.patch("/updateLeadPersonalDetails", updateLeadPersonalDetails);
router.patch("/updateLeadStatus", updateLeadStatus);
router.post("/addQualification", addQualification);
router.patch("/removeQualification", removeQualification);
router.patch("/editQualification", editQualification);
router.patch("/leadToUserAssignment", leadToUserAssignment);

// Lead cruds - admin only will do
router.post("/", createLead);
router.get("/", getAllLeads);
router.patch("/:id", updateLead);

export default router;
