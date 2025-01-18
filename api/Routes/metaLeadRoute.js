import express from "express";
import { getMetaLeads } from "../Controllers/metaLeadController.js";
const router = express.Router();
// router.use(protect);

router.get("/", getMetaLeads);

export default router;
