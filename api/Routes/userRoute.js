import express from "express";
import { protect } from "../middlewares/auth.js";
import {
  addUser,
  dropUser,
  receiveUsers,
  userGroup,
} from "../Controllers/userController.js";
const router = express.Router();

router.use(protect);

// User or staff cruds - admin only will do
router.post("/", addUser);
router.get("/", receiveUsers);
// router.put("/", updateUser);
router.delete("/:id", dropUser);

router.post("/userGroup", userGroup); // to group users by leader

export default router;
