import express from "express";
import {
  addUser,
  dropUser,
  receiveUsers,
  updateUser,
  userGroup,
} from "../Controllers/userController.js";
const router = express.Router();


// User or staff cruds - admin only will do
router.post("/", addUser);
router.get("/", receiveUsers);
router.put("/", updateUser);
router.delete("/:id", dropUser);

router.post("/userGroup", userGroup); // to group users by leader or branch manager

export default router;
