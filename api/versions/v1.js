import express from "express";
import roleRoute from "../Routes/roleRoute.js";
import branchRoute from "../Routes/branchRoute.js";
import countryRoute from "../Routes/countryRoute.js";
import leadRoute from "../Routes/leadRoute.js";
import statusRoute from "../Routes/statusRoute.js";
import userRoute from "../Routes/userRoute.js";
import chatRoute from "../Routes/chatRoute.js";
import universityRoute from "../Routes/University/universityRoute.js";
import metaLeadRoute from "../Routes/metaLeadRoute.js";
import metaAccountRoute from "../Routes/metaAccountRoute.js";
import generalRoute from "../Routes/generalRoute/generalRoute.js";
import applicationRoute from "../Routes/applicationRoute.js";
import batchRoute from "../Routes/batchRoute/batchRoute.js";
import courseRoute from "../Routes/University/courseRoute.js";

const router = express.Router();

router.use("/user", userRoute);
router.use("/meta_lead", metaLeadRoute);
router.use("/meta_account", metaAccountRoute);
router.use("/branch", branchRoute);
router.use("/country", countryRoute);
router.use("/lead", leadRoute);
router.use("/role", roleRoute);
router.use("/status", statusRoute);
router.use("/university", universityRoute);
router.use("/chat", chatRoute);
router.use("/general", generalRoute);
router.use("/application", applicationRoute);
router.use("/batch", batchRoute);

export default router;
