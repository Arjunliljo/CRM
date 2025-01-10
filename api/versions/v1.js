import express from "express";
import adminRoutes from "../Routes/adminRoutes.js";

const router = express.Router();

router.use("/webhook", (req, res) => {
  const VERIFY_TOKEN =
    "EAAP7ZCBheEt8BO5KYpsTY4RokhSaxUyQle2BGYSLbZCmgnZBlEtedGEWx83TsbjVBY1R21iu4PXxRf1lsszAZBUbsFwZAgKZBg6pXdaoHCB7XTgD7h8aV8nIK6BAsYuSnk76LVlNFq7uKEWwqjFQ8ygd4zq3L0toWa1YhrmcJD1LXGJBVSII7Ps4jjJGa4xZAi1y6melqOjSrj2HIp8";
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  console.log(req.body.entry[0].changes, "body");

  console.log(mode, token, challenge, "mode");

  if (mode && token === VERIFY_TOKEN) {
    if (mode === "subscribe") {
      console.log("Webhook verified!");
      res.status(200).send(challenge);
    }
  } else {
    res
      .status(403)
      .send("Verification failed. Token mismatch or invalid mode.");
  }
});

// Add a simple base route
router.get("/", (req, res) => {
  res.send("Version One Home");
});

// Nest admin routes under /api/v2/admin
router.use("/admin", adminRoutes);

export default router;
