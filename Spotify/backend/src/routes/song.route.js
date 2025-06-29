import { Router } from "express";
import auth from "../middleware/auth.middleware.js";
import {
  getAllSongs,
  getFeaturedSongs,
  getMadeForYouSongs,
  getTrendingSongs,
  addSong,
  addSongToLiked,
} from "../controllers/song.controller.js";

const router = Router();

router.get("/", auth, getAllSongs);
router.get("/featured", getFeaturedSongs);
router.get("/made-for-you", getMadeForYouSongs);
router.get("/trending", getTrendingSongs);

router.post("/", auth, addSong);
router.post("/liking/:id", auth, addSongToLiked);

export default router;
