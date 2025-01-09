import express from "express";
import adminRoutes from "../Routes/adminRoutes.js";

const router = express.Router();

// Add a simple base route
router.get("/", (req, res) => {
  res.send("Version One Home");
});

// Nest admin routes under /api/v2/admin
router.use("/admin", adminRoutes);

export default router;
