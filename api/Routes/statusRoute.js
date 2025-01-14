import express from "express";
import { protect } from "../middlewares/auth.js";
import { createStatus, getAllStatus } from "../Controllers/statusController.js";
const router = express.Router();

router.use(protect);

router.post("/", createStatus);
router.get("/", getAllStatus);

export default router;
