import express from "express";
import adminRoutes from "../Routes/adminRoute.js";
import roleRoute from "../Routes/roleRoute.js";
import branchRoute from "../Routes/branchRoute.js";
import countryRoute from "../Routes/countryRoute.js";
import leadRoute from "../Routes/leadRoute.js";
import statusRoute from "../Routes/statusRoute.js";
import userRoute from "../Routes/userRoute.js";

const router = express.Router();

// Nest admin routes under /api/v2/admin
router.use("/", adminRoutes);
router.use("/branch", branchRoute);
router.use("/country", countryRoute);
router.use("/lead", leadRoute);
router.use("/role", roleRoute);
router.use("/status", statusRoute);
router.use("/user", userRoute);

export default router;
