import express from "express";
const router = express.Router();
import { signin, signup } from "../Controllers/adminAuthController.js";
import { protect } from "../middlewares/auth.js";
import { changeUserPassword } from "../Controllers/userController.js";

//admin auth routes
router.post("signup", signup);
router.post("signin", signin);
router.put("/changeUserPassword/:id", protect, changeUserPassword);

export default router;
