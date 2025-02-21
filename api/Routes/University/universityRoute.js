import express from "express";
import qualificationRoute from "./qualificationRoute.js";
import courseRoute from "./courseRoute.js";
import {
  createUniversity,
  getAllUniversity,
  getUniversity,
  updateUniversity,
  deleteUniversity,
} from "../../Controllers/University/universityController.js";

const router = express.Router();

router.use("/qualification", qualificationRoute);
router.use("/course", courseRoute);

router.post("/", createUniversity);
router.get("/", getAllUniversity);
router.get("/:id", getUniversity);
router.patch("/:id", updateUniversity);
router.delete("/:id", deleteUniversity);

export default router;
