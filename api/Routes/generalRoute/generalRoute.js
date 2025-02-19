import express from "express";
import catchAsync from "../../Utilities/catchAsync.js";
import General from "../../Models/generalModel.js";
import {
  createGeneral,
  getAllGenerals,
  getGeneral,
  updateGeneral,
  deleteGeneral,
  autoAssignLeadsToBranch,
} from "../../Controllers/generalController.js";
const router = express.Router();

router.patch("/auto-assign", autoAssignLeadsToBranch);

router.post("/", createGeneral);
router.get("/", getAllGenerals);
router.get("/:id", getGeneral);
router.patch("/:id", updateGeneral);
router.delete("/:id", deleteGeneral);

export default router;
