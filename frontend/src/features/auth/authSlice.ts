import { createSlice, createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Define the type for AsyncThunkConfig if you haven't already
interface AsyncThunkConfig {
  // define any necessary properties here
}

const user = JSON.parse(localStorage.getItem("user") || "null");

const initialState = {
  user: user || null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register user
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const register: AsyncThunk<any, any, AsyncThunkConfig> =
  createAsyncThunk(
    "auth/register",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (user: any, thunkAPI: any) => {
      try {
        console.log("Dispatching register action with user:", user);
        return await authService.register(user);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Error in register thunk:", error);
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        console.log(action.payload);
        console.log(state);
        console.log(action);

        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
