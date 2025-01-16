import express from "express";
const router = express.Router();
import { protect } from "../middlewares/auth.js";
import { changeUserPassword } from "../Controllers/userController.js";
import { signin, signup } from "../Controllers/clientController.js";

//admin auth routes
router.post("/signup", signup);
router.post("/signin", signin);
router.put("/changeUserPassword/:id", protect, changeUserPassword);

export default router;
