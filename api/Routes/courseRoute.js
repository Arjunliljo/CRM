import express from "express";
import { createCourse } from "../Controllers/courseController.js";
const router = express.Router();

router.post("/", createCourse);

export default router;
