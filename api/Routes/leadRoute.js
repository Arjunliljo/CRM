import express from "express";
// import { protect } from "../middlewares/auth.js";
import {
  assignLeadsToUsers,
  branchLeadAssignment,
  createLead,
  getAllLeads,
} from "../Controllers/leadController.js";
const router = express.Router();

// router.use(protect);

// Lead cruds - admin only will do
router.post("/", createLead);
router.get("/", getAllLeads);
// router.put("/", updateLead);
// router.delete("/", dropLead);

router.post("/branchLeadAssignment", branchLeadAssignment); //distribute leads to branch
router.post("/assignLeadsToUsers", assignLeadsToUsers); //distribute leads to users

export default router;
