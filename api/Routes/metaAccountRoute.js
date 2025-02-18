import express from "express";

import {
  deleteMetaAccount,
  getMetaAccounts,
  updateMetaAccount,
  createMetaAccount,
} from "../Controllers/metaAccountController.js";

const router = express.Router();

router.post("/", createMetaAccount);
router.get("/", getMetaAccounts);
router.patch("/:id", updateMetaAccount);
router.delete("/:id", deleteMetaAccount);

export default router;
