import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { updateApiToken, axiosInstance } from "../../lib/axios";
import type { Song } from "./songsSlice";

type DecodedToken = {
  id: string;
  username?: string;
  email?: string;
  imageUrl?: string;
  exp?: number;
};

type UserState = {
  token: string | null;
  user: DecodedToken | null;
  loading: boolean;
  likedSongs: Song[];
  likedSongsStatus: "idle" | "loading" | "succeeded" | "failed";
  likedSongsError: string | null;
};

const initialState: UserState = {
  token: null,
  user: null,
  loading: true,
  likedSongs: [],
  likedSongsStatus: "idle",
  likedSongsError: null,
};

// 🔹 Initialize auth from localStorage
export const initializeAuth = createAsyncThunk(
  "user/initializeAuth",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) return thunkAPI.rejectWithValue("No token");

    const decoded = jwtDecode<DecodedToken>(token);
    const now = Date.now() / 1000;

    if (decoded.exp && decoded.exp < now) {
      localStorage.removeItem("token");
      return thunkAPI.rejectWithValue("Token expired");
    }

    updateApiToken(token);
    return { token, user: decoded };
  }
);

export const fetchUserLikedSongs = createAsyncThunk(
  "user/fetchLikedSongs",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`users/likedSongs`);

      return res.data.likedSongs;
    } catch (error: any) {
      console.error(
        "Error fetching liked songs:",
        error.response || error.message
      );
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch liked songs"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.user = jwtDecode<DecodedToken>(action.payload.token);
      state.loading = false;
      localStorage.setItem("token", action.payload.token);
      updateApiToken(action.payload.token);
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.loading = false;
      localStorage.removeItem("token");
      state.likedSongs = [];
      state.likedSongsStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.token = null;
        state.user = null;
        state.loading = false;
      })

      // Liked songs
      .addCase(fetchUserLikedSongs.pending, (state) => {
        state.likedSongsStatus = "loading";
        state.likedSongsError = null;
      })
      .addCase(fetchUserLikedSongs.fulfilled, (state, action) => {
        state.likedSongs = action.payload;
        state.likedSongsStatus = "succeeded";
      })
      .addCase(fetchUserLikedSongs.rejected, (state, action) => {
        state.likedSongsStatus = "failed";
        state.likedSongsError = action.payload as string;
      });
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice;
