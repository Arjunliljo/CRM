import express from "express";
import { protect } from "../middlewares/auth.js";
import {
  createBranch,
  receiveBranches,
} from "../Controllers/branchController.js";
const router = express.Router();

router.use(protect);

// Branch cruds - admin only will do
router.post("/", createBranch);
router.get("/", receiveBranches);
// router.put("/",updateBranch);
// router.delete("/",dropBranch);

export default router;
