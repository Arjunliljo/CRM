import express from "express";

const router = express.Router();

router.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = "my-verification-token";
  const mode = req.query["hub.mode"];
  const token = req.query["qwertyuiopasdfghjkkl"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified.");

    // Respond with the exact challenge value
    res.status(200).send(challenge);
  } else {
    console.log("Webhook verification failed.");
    res.status(403).send("Verification failed.");
  }
});

router.use("/", (req, res) => {
  res.send("Hello World");
});

export default router;
