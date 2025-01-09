import express from "express";

const router = express.Router();

const VERIFY_TOKEN = "qwertyuiopasdfghjkkl";

router.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified!");

    res.status(200).send(challenge);
  } else {
    console.error("Verification failed. Token mismatch or invalid mode.");
    res.sendStatus(403); // Forbidden
  }
});

router.get("/add-account", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified!");

    res.status(200).send(challenge);
  } else {
    console.error("Verification failed. Token mismatch or invalid mode.");
    res.sendStatus(403); // Forbidden
  }
});

router.use("/", (req, res) => {
  res.send("Hello World");
});

export default router;
