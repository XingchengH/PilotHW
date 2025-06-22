import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Theme = "light" | "dark";

interface ThemeState {
  mode: Theme;
}

const initialState: ThemeState = {
  mode: (localStorage.getItem("theme") as Theme) || "light",
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme(state) {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
            localStorage.setItem("theme", state.mode);
            document.body.setAttribute("data-bs-theme", state.mode);
        },
        setTheme(state, action: PayloadAction<Theme>) {
            state.mode = action.payload;
            localStorage.setItem("theme", state.mode);
            document.body.setAttribute("data-bs-theme", state.mode);
        }
    }
})

export const {toggleTheme, setTheme} = themeSlice.actions;
export default themeSlice;