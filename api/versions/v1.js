import express from "express";
import roleRoute from "../Routes/roleRoute.js";
import branchRoute from "../Routes/branchRoute.js";
import countryRoute from "../Routes/countryRoute.js";
import leadRoute from "../Routes/leadRoute.js";
import statusRoute from "../Routes/statusRoute.js";
import userRoute from "../Routes/userRoute.js";
import courseRoute from "../Routes/courseRoute.js";
import universityRoute from "../Routes/universityRoute.js";
import metaLeadRoute from "../Routes/metaLeadRoute.js";

const router = express.Router();

// router.use("/webhook", (req, res) => {
//   const VERIFY_TOKEN =
//     "EAAP7ZCBheEt8BO5KYpsTY4RokhSaxUyQle2BGYSLbZCmgnZBlEtedGEWx83TsbjVBY1R21iu4PXxRf1lsszAZBUbsFwZAgKZBg6pXdaoHCB7XTgD7h8aV8nIK6BAsYuSnk76LVlNFq7uKEWwqjFQ8ygd4zq3L0toWa1YhrmcJD1LXGJBVSII7Ps4jjJGa4xZAi1y6melqOjSrj2HIp8";
//   const mode = req.query["hub.mode"];
//   const token = req.query["hub.verify_token"];
//   const challenge = req.query["hub.challenge"];

//   console.log(req.body.entry[0].changes, "body");

//   console.log(mode, token, challenge, "mode");

//   if (mode && token === VERIFY_TOKEN) {
//     if (mode === "subscribe") {
//       console.log("Webhook verified!");
//       res.status(200).send(challenge);
//     }
//   } else {
//     res
//       .status(403)
//       .send("Verification failed. Token mismatch or invalid mode.");
//   }
// });

router.use("/user", userRoute);
router.use("/meta_lead", metaLeadRoute);
router.use("/branch", branchRoute);
router.use("/country", countryRoute);
router.use("/lead", leadRoute);
router.use("/role", roleRoute);
router.use("/status", statusRoute);
router.use("/course", courseRoute);
router.use("/university", universityRoute);


export default router;
