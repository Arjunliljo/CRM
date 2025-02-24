import express from "express";
import { leadsToBranch } from "../../Controllers/LeadDistribution/leadsToBranchController.js";

const router = express.Router();

router.patch("/leads-to-branch", leadsToBranch);

export default router;
