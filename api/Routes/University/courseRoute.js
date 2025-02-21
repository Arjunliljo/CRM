import express from "express";
import {
  createCourse,
  getAllCourse,
  getCourse,
  updateCourse,
  deleteCourse,
} from "../../Controllers/University/universityController.js";

const router = express.Router();

router.post("/", createCourse);
router.get("/", getAllCourse);
router.get("/:id", getCourse);
router.patch("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;
