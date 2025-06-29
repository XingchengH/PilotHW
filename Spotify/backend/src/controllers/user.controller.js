import User from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const currentUserId = req.user.id;
    const users = await User.find({ _id: { $ne: currentUserId } });
    res.status(201).json(users);
  } catch (err) {
    next(err);
  }
};

export const getLikedSongs = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("likedSongs");

    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ likedSongs: user.likedSongs });
  } catch (err) {
    next(err);
  }
};
