import { Router } from "express";
import auth from "../middleware/auth.middleware.js";
import { getAllUsers, getLikedSongs } from "../controllers/user.controller.js";

const router = Router();

router.get("/", auth, getAllUsers);

router.get("/like", auth, getLikedSongs);

export default router;
