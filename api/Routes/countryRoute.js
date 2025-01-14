import express from "express";
import {
  createCountry,
  getAllCountries,
  getCountry,
  deleteCountry,
} from "../Controllers/countryController.js";
const router = express.Router();

router.post("/", createCountry);
router.get("/", getAllCountries);
router.get("/:id", getCountry);
router.delete("/:id", deleteCountry);

export default router;
