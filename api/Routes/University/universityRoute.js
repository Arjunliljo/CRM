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
import upload from "../../middlewares/uploadMiddlware.js";
const router = express.Router();

router.use("/qualification", qualificationRoute);
router.use("/course", courseRoute);

router.post("/", upload, createUniversity);
router.get("/", getAllUniversity);
router.get("/:id", getUniversity);
router.patch("/:id", upload, updateUniversity);
router.delete("/:id", deleteUniversity);

export default router;
