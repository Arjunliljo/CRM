import express from "express";
import { createChat, getChats, updateChat, markMessagesAsRead } from "../Controllers/chatController.js";

const router = express.Router();

router.post("/create", createChat);
router.get("/", getChats);
router.patch("/update", updateChat);
router.patch("/markAsRead", markMessagesAsRead);
// router.patch("/:id", updateChat);

export default router;