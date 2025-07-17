// src/features/theme/themeSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
}

// Helper functions inside the slice file
const setDarkMode = () => {
  document.body.setAttribute("data-theme", "dark");
  localStorage.setItem("theme", "dark");
};

const setLightMode = () => {
  document.body.setAttribute("data-theme", "light");
  localStorage.setItem("theme", "light");
};

const getSystemTheme = (): Theme => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const getSavedTheme = (): Theme | null => {
  const saved = localStorage.getItem("theme");
  return saved === "light" || saved === "dark" ? saved : null;
};

// Initialize theme from saved or system preference
const initTheme = (): Theme => {
  const savedTheme = getSavedTheme();
  const themeToSet = savedTheme || getSystemTheme();

  if (themeToSet === "dark") {
    setDarkMode();
  } else {
    setLightMode();
  }

  return themeToSet;
};

const initialState: ThemeState = {
  theme: typeof window !== "undefined" ? initTheme() : "light", // SSR safe check
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      if (state.theme === "dark") {
        setDarkMode();
      } else {
        setLightMode();
      }
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      if (state.theme === "dark") {
        setDarkMode();
      } else {
        setLightMode();
      }
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
