import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("token");
const userData = token ? jwtDecode(token) : null;

const userSlide = createSlice({
  name: "user",
  initialState: {
    token,
    user: userData,
  },
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.user = jwtDecode(action.payload.token);
      localStorage.setItem("token", action.payload.token);
    },
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = userSlide.actions;
export default userSlide;
