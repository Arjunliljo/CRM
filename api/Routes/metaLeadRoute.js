import express from "express";
import {
  getCampaigns,
  getMetaLeads,
  updateCampaigns,
  getForms,
  getCampaignsFromDb,
} from "../Controllers/Meta/metaLeadController.js";
const router = express.Router();
// router.use(protect);

router.get("/create_ac", getMetaLeads);
router.get("/", getMetaLeads);
router.get("/campaigns", getCampaigns);
router.get("/campaigns_db", getCampaignsFromDb);
router.get("/forms", getForms);
router.patch("/updateCampaigns", updateCampaigns);

export default router;
