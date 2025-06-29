import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";

export interface Album {
  _id: string;
  title: string;
  artist: string;
  imgUrl: string;
  releaseYear: number;
  songs?: string[];
}

export const fetchAlbums = createAsyncThunk<Album[]>("albums/fetchAlbums", async () => {
  const res = await axiosInstance.get("/albums");
  return res.data;
});



const albumsSlice = createSlice({
  name: "albums",
  initialState: {
    albums: [] as Album[],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.albums = action.payload;
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default albumsSlice;
