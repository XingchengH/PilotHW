import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import themeSlice from "./themeSlice";

const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    theme: themeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;
export default store;
