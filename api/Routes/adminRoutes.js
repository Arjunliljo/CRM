import express from "express";
const router = express.Router();
import {
  addUser,
  changeUserPassword,
  createBranch,
  createCountry,
  createRole,
  getBranch,
} from "../Controllers/adminController.js";
import { signin, signup } from "../Controllers/adminAuthController.js";
import { protect } from "../middlewares/auth.js";
import { createStatus, receiveAllStatus } from "../Controllers/statusController.js";
import { createLead } from "../Controllers/leadController.js";

//admin auth routes
router.post("/signup", signup);
router.post("/signin", signin);

// Role cruds - admin only will do
router.post("/createRole", protect, createRole);
// router.get("/receiveRoles", protect, receiveRoles);
// router.put("/updateRole", protect, updateRole);
// router.delete("/dropRole", protect, dropRole);

// Branch cruds - admin only will do
router.post("/createBranch", protect, createBranch);
// router.get("/receiveBranches", protect, receiveBranches);
// router.put("/updateBranch", protect, updateBranch);
// router.delete("/dropBranch", protect, dropBranch);

// Countries cruds - admin only will do
router.post("/createCountry", protect, createCountry);
// router.get("/receiveCountries", protect, receiveCountries);
// router.put("/updateCountry", protect, updateCountry);
// router.delete("/dropCountry", protect, dropCountry);

// User or staff cruds - admin only will do
router.post("/createUser", protect, addUser);
router.put("/changeUserPassword/:id", protect, changeUserPassword);
// router.get("/receiveUsers", protect, receiveUsers);
// router.put("/updateUser", protect, updateUser);
// router.delete("/dropUser", protect, dropUser);

// Status cruds - admin only will do
router.post("/createStatus",protect, createStatus);
router.get("/receiveAllStatus", protect, receiveAllStatus);
// router.put("/updateStatus", protect, updateStatus);
// router.delete("/dropStatus", protect, dropStatus);

// Lead cruds - admin only will do
router.post("/createLead", protect, createLead);
// router.get("/receiveLeads", protect, receiveLeads);
// router.put("/updateLead", protect, updateLead);
// router.delete("/dropLead", protect, dropLead);

export default router;
