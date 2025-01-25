import express from "express";
import { createUniversity } from "../Controllers/universityController.js";
const router = express.Router();

router.post("/", createUniversity);

export default router;
