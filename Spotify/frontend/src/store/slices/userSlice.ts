import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { updateApiToken } from "../../lib/axios";

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
};

const initialState: UserState = {
  token: null,
  user: null,
  loading: true,
};

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


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.user = jwtDecode<DecodedToken>(action.payload.token);
      state.loading = false;
      localStorage.setItem("token", action.payload.token);
      updateApiToken(state.token);
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.loading = false;
      localStorage.removeItem("token");
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
        updateApiToken(action.payload.token);
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.token = null;
        state.user = null;
        state.loading = false;
      });
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice;
