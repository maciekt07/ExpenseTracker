import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Settings } from "../../types/types";

const loadSettingsFromLocalStorage = (): Settings => {
  const savedSettings = localStorage.getItem("settings");
  return savedSettings ? JSON.parse(savedSettings) : { theme: "system", currency: "USD" };
};

const defaultSettings: Settings = loadSettingsFromLocalStorage();

export const initialState = {
  settings: defaultSettings,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    reset: (state) => {
      localStorage.removeItem("settings");
      state.settings = defaultSettings;
    },
    updateSettings: (state, action: PayloadAction<Settings>) => {
      state.settings = action.payload;
      localStorage.setItem("settings", JSON.stringify(action.payload));
    },
  },
});

export const { reset, updateSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
