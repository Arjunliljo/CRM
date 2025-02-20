import express from "express";
// import { protect } from "../middlewares/auth.js";
import {
  assignLeadsToUsers,
  branchLeadAssignment,
  createLead,
  getAllLeads,
  uploadLeadFile,
  updateLeadDocuments,
  deleteLeadDocument,
  updateLeadRemark,
  updateLeadPersonalDetails
} from "../Controllers/leadController.js";
import upload from "../middlewares/uploadMiddlware.js";
import deleteFile from "../middlewares/deleteFile.js";
const router = express.Router();

// router.use(protect);

// Lead cruds - admin only will do
router.post("/", createLead);
router.get("/", getAllLeads);

// router.put("/", updateLead);
// router.delete("/", dropLead);
router.post("/uploadLeadFile",upload, uploadLeadFile);
router.patch("/deleteLeadDocument", deleteFile, deleteLeadDocument);
router.patch("/updateLeadDocuments", deleteFile, updateLeadDocuments);
router.post("/branchLeadAssignment", branchLeadAssignment); //distribute leads to branch
router.post("/assignLeadsToUsers", assignLeadsToUsers); //distribute leads to users
router.patch("/updateLeadRemark", updateLeadRemark);
router.patch("/updateLeadPersonalDetails", updateLeadPersonalDetails);

export default router;
