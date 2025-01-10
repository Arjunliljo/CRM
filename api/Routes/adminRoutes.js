import express from "express";
const router = express.Router();
import multer from "multer";
import {
  addUser,
  changePasswordByAdmin,
  createBranch,
  createCountries,
  createRole,
} from "../Controllers/adminController.js";
import { signin, signup } from "../Controllers/adminAuthController.js";
import { protect } from "../middlewares/auth.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // stored temporarily
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

const upload = multer({ storage: storage });

//admin auth routes
router.post("/signup",upload.single("logo"), signup);
router.post("/signin", signin);

router.post("/createRole", createRole);
router.post("/createBranch", protect, createBranch);
router.post("/createCountries", upload.single("flag"), createCountries);
router.post("/createUser", upload.single("image"), addUser);
// router.post("/createStatus", upload.single("image"), addStatus);

router.post("/changePassword/:id", changePasswordByAdmin);

export default router;
