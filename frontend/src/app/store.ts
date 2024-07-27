import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import expenseReducer from "../features/expenses/expenseSlice";
import settingsReducer from "../features/settings/settingsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expenseReducer,
    settings: settingsReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
