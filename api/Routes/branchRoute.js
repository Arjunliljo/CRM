import express from "express";
import {
  createBranch,
  receiveBranches,
} from "../Controllers/branchController.js";
const router = express.Router();



// Branch cruds - admin only will do
router.post("/", createBranch);
router.get("/", receiveBranches);

// router.put("/",updateBranch);
// router.delete("/",dropBranch);

export default router;
