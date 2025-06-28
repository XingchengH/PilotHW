import { configureStore } from "@reduxjs/toolkit";
import userSlide from "./slices/userSlice";

const store = configureStore({
  reducer: {
    user: userSlide.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;
export default store;
