import mongoose from "mongoose";

const albumSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    imgUrl: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    songs: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Song", default: null },
    ],
  },
  { timestamps: true }
);

export const Album = mongoose.model("Album", albumSchema);
