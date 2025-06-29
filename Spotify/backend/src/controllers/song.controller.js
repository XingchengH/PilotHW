import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";
import User from "../models/user.model.js";

export const getAllSongs = async (req, res, next) => {
  try {
    // -1 means descending
    const songs = await Song.find().sort({ createdAt: -1 });
    res.json(songs);
  } catch (err) {
    next(err);
  }
};

export const getFeaturedSongs = async (req, res, next) => {
  try {
    // showing 6 songs using aggregation pipeline
    const songs = await Song.aggregate([
      { $sample: { size: 6 } },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    res.json(songs);
  } catch (err) {
    next(err);
  }
};

export const getMadeForYouSongs = async (req, res, next) => {
  try {
    // showing 4 songs using aggregation pipeline
    const songs = await Song.aggregate([
      { $sample: { size: 4 } },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    res.json(songs);
  } catch (err) {
    next(err);
  }
};

export const getTrendingSongs = async (req, res, next) => {
  try {
    // showing 4 songs using aggregation pipeline
    const songs = await Song.aggregate([
      { $sample: { size: 6 } },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    res.json(songs);
  } catch (err) {
    next(err);
  }
};

export const addSong = async (req, res, next) => {
  try {
    const { title, artist, imgUrl, audioUrl, duration, genre, language, albumId } = req.body;

    const song = new Song({
      title,
      artist,
      imgUrl: imgUrl || "",
      audioUrl,
      duration,
      albumId: albumId || null,
    });

    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }

    res.status(201).json(song);
  } catch (error) {
    res.status(500).json({ message: "Failed to add song", error });
  }
};

export const addSongToLiked = async (req, res) => {
  try {
    const { songId } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likedSongs: songId } },
      { new: true }
    ).populate("likedSongs");

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to add to Liked songs", error });
  }
};
