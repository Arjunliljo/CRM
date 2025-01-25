import express from "express";
import {
  getMetaLeads,
  updateCampaigns,
} from "../Controllers/metaLeadController.js";
const router = express.Router();
// router.use(protect);

router.get("/", getMetaLeads);
router.patch("/updateCampaigns", updateCampaigns);

export default router;
