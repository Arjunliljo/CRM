import express from "express";
import {
  createBranch,
  getAllBranches,
  getBranch,
  deleteBranch,
  updateBranch,
} from "../Controllers/branchController.js";
const router = express.Router();

// Branch cruds - admin only will do
router.post("/", createBranch);
router.get("/", getAllBranches);
router.get("/:id", getBranch);
router.patch("/:id", updateBranch);
router.delete("/:id", deleteBranch);

export default router;
