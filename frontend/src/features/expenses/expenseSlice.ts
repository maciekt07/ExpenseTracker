import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import expenseService from "./expenseService";
import { Expense, ExpenseDocument } from "@shared/types/types";

interface AsyncThunkConfig {}

const initialState = {
  expenses: [] as Expense[],
  expense: null as Expense | null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// create new expense

export const createExpense: AsyncThunk<Expense, Expense, AsyncThunkConfig> = createAsyncThunk(
  "expsense/create",
  async (expenseData: Expense, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.user?.token;
      return await expenseService.createExpense(expenseData, token || "");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error in register thunk:", error);
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Get user expenses
export const getExpenses: AsyncThunk<Expense, Expense, AsyncThunkConfig> = createAsyncThunk(
  "expense/getAll",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.user?.token;
      console.log(await expenseService.getExpenses(token || ""));

      return await expenseService.getExpenses(token || "");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const getExpenseDetails = createAsyncThunk<Expense, string, { state: RootState }>(
  "expense/getDetails",
  async (id: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.user?.token;
      if (!token) {
        throw new Error("No authentication token available");
      }
      return await expenseService.getExpenseDetails(id, token);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || "Failed to fetch expense details";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Delete expense
export const deleteExpense: AsyncThunk<{ id: string }, string, AsyncThunkConfig> = createAsyncThunk(
  "expsense/delete",
  async (id: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.user?.token;
      await expenseService.deleteExpense(id, token || "");
      return { id };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error in register thunk:", error);
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const updateExpense = createAsyncThunk(
  "expense/update",
  async (expenseData: Expense, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.user?.token;
      return await expenseService.updateExpense(expenseData, token || "");
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to update expense");
    }
  },
);

export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    reset: (_state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.expenses.push(action.payload);
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // Get user expenses
      .addCase(getExpenses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExpenses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        state.expenses = action.payload as any;
      })
      .addCase(getExpenses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      // Delete expense
      .addCase(deleteExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.expenses = state.expenses.filter(
          (expense) => (expense as ExpenseDocument)._id !== action.payload.id,
        );
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.expenses.findIndex((expense) => expense._id === action.payload._id);
        if (index !== -1) {
          state.expenses[index] = action.payload;
        }
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(getExpenseDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExpenseDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        state.expense = action.payload as Expense;
      })
      .addCase(getExpenseDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = expenseSlice.actions;
export default expenseSlice.reducer;
