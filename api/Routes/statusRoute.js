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

router.get("/", getAllStatus);
router.get("/:id", getStatus);
router.post("/", createStatus);
router.delete("/substatus", deleteSubStatus);
router.patch("/substatus/:id", updateSubStatus);
router.patch("/:id", updateStatus);
router.delete("/:id", deleteStatus);
export default router;
