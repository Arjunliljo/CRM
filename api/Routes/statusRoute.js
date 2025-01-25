import express from "express";
// import { protect } from "../middlewares/auth.js";
import {
  createStatus,
  deleteStatus,
  deleteSubStatus,
  getAllStatus,
  getStatus,
  updateStatus,
} from "../Controllers/statusController.js";
const router = express.Router();

// router.use(protect);

router.get("/", getAllStatus);
router.get("/:id", getStatus);
router.post("/", createStatus);
router.patch("/:id", updateStatus);
router.delete("/:id", deleteStatus);

router.delete("/substatus/:val", deleteSubStatus);
export default router;
