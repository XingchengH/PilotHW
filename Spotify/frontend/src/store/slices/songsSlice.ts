import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import axios from "axios";

export const fetchSongs = createAsyncThunk("songs/fetchSongs", async () => {
  console.log("Fetching songs from /api/songs"); // 🛑 Add this
  const res = await axiosInstance.get("/songs");
  return res.data;
});

const songsSlice = createSlice({
  name: "songs",
  initialState: {
    songs: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.songs = action.payload;
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default songsSlice;
