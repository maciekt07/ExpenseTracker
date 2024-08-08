import { store } from "../app/store";
import { RootState } from "../app/store";
import { Settings } from "../types/types";

// Function to get settings from the store
function getSettings(): Settings {
  const state = store.getState() as RootState;
  return state.settings.settings;
}

// Function to format currency based on settings
export function formatCurrency(amount: number): string {
  const settings = getSettings();
  const formatter = new Intl.NumberFormat(navigator.language || "en-US", {
    style: "currency",
    currency: settings.currency || "USD",
  });
  return formatter.format(amount);
}
