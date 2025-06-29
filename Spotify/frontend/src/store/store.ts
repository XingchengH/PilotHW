import { configureStore } from "@reduxjs/toolkit";
import userSlide from "./slices/userSlice";
import songsSlice from "./slices/songsSlice";
import albumsSlice from "./slices/albumsSlice";

const store = configureStore({
  reducer: {
    user: userSlide.reducer,
    songs: songsSlice.reducer,
    albums: albumsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;
export default store;
