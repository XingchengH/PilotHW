import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res, next) => {
  try {
    const currentUserId = req.user.id;
    const users = await User.find({ _id: { $ne: currentUserId } });
    res.status(201).json(users);
  } catch (err) {
    next(err);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user.id !== id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(req.user);
  } catch (error) {
    next(error);
  }
};

// export const getLikedSongsByUserId = async (req, res) => {
//   const userId = req.user._id;
//   try {
//     const user = await User.findById(userId).populate("likedSongs");
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json({ likedSongs: user.likedSongs });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };
export const getLikedSongs = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId).populate("likedSongs");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ likedSongs: user.likedSongs });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};


export const updateUserProfile = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const updates = {};

    if (username) updates.username = username;
    if (email) updates.email = email;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(password, salt);
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updateUser) {
      return res.status(401).json({ message: "User not found." });
    }

    res.json(updateUser);
  } catch (error) {
    console.log("Error updating user", error);
    res.status(500).json({ message: "Failed to update user", error });
  }
};
