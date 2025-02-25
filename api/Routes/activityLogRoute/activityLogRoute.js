import express from "express";

import {
  deleteActivityLog,
  getActivityLog,
  getAllActivityLogs,
  updateActivityLog,
} from "../../Controllers/ActivityLog/activityLogController.js";

const router = express.Router();

router.get("/", getAllActivityLogs);
router.get("/:id", getActivityLog);
router.patch("/:id", updateActivityLog);
router.delete("/:id", deleteActivityLog);

export default router;
