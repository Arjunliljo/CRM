import express from "express";
// import { protect } from "../middlewares/auth.js";
import {
  createStatus,
  deleteStatus,
  deleteSubStatus,
  getAllStatus,
  getStatus,
  updateStatus,
  updateSubStatus,
} from "../Controllers/statusController.js";
const router = express.Router();

// router.use(protect);

router.delete("/substatus", deleteSubStatus);
router.patch("/substatus/:id", updateSubStatus);

router.get("/", getAllStatus);
router.get("/:id", getStatus);
router.post("/", createStatus);
router.patch("/:id", updateStatus);
router.delete("/:id", deleteStatus);
export default router;
