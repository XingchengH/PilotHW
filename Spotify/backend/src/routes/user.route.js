import { Router } from "express";
import auth from "../middleware/auth.middleware.js";
import {
  getAllUsers,
  getLikedSongs,
  updateUserProfile,
  getCurrentUser,
  deleteLiked,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/", auth, getAllUsers);
router.get("/likedSongs", auth, getLikedSongs);
router.get("/:id", auth, getCurrentUser);

router.put("/:id", updateUserProfile);
router.delete("/unlike", auth, deleteLiked);

export default router;
