import express from "express";
import { createCountry } from "../Controllers/countryController.js";
const router = express.Router();


// Countries cruds - admin only will do
router.post("/", createCountry);
// router.get("/", receiveCountries);
// router.put("/", updateCountry);
// router.delete("/", dropCountry);

export default router;
