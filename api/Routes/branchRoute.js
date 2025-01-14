import express from "express";
import {
  createBranch,
  getAllBranches,
} from "../Controllers/branchController.js";
const router = express.Router();

// Branch cruds - admin only will do
router.post("/", createBranch);
router.get("/", getAllBranches);

// router.put("/", updateBranch);
// router.delete("/", dropBranch);

export default router;
