import { Router } from "express";
import auth from "../middleware/auth.middleware.js";
import {
  getAllUsers,
  getLikedSongs,
  updateUserProfile,
  getCurrentUser,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/", auth, getAllUsers);
router.get("/:id", auth, getCurrentUser);
router.get("/:id/liked-songs", auth, getLikedSongs);

router.put("/:id", updateUserProfile);

export default router;
