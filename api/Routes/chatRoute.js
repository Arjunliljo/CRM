import express from "express";
import { createChat, getChats, updateChat } from "../Controllers/chatController.js";

const router = express.Router();

router.post("/create", createChat);
router.get("/", getChats);
router.put("/update", updateChat);
// router.patch("/:id", updateChat);

export default router;