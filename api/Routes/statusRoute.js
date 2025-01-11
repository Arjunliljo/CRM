import express from "express";
import { protect } from "../middlewares/auth.js";
import {
  createStatus,
  receiveAllStatus,
} from "../Controllers/statusController.js";
const router = express.Router();

router.use(protect);

// Status cruds - admin only will do
router.post("/", createStatus);
router.get("/", receiveAllStatus);
// router.put("/", protect, updateStatus);
// router.delete("/", protect, dropStatus);

export default router;
