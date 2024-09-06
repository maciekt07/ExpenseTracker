import { createSlice, createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { UserData } from "@shared/types/types";

interface AsyncThunkConfig {}

const user = JSON.parse(localStorage.getItem("user") || "null");

const initialState = {
  user: (user as UserData | null) || null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register user

export const register: AsyncThunk<UserData, UserData, AsyncThunkConfig> = createAsyncThunk(
  "auth/register",
  async (user: UserData, thunkAPI) => {
    try {
      console.log("Dispatching register action with user:", user);
      return await authService.register(user);
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

export const logout = createAsyncThunk<void, void, AsyncThunkConfig>(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      authService.logout();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error logging out:", error);
      return thunkAPI.rejectWithValue(error.message || error.toString());
    }
  },
);

export const login: AsyncThunk<UserData, UserData, AsyncThunkConfig> = createAsyncThunk(
  "auth/login",
  async (user: UserData, thunkAPI) => {
    try {
      console.log("Dispatching login action with user:", user);
      return await authService.login(user);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error in login thunk:", error);
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const updateUser = createAsyncThunk<UserData, Partial<UserData>, AsyncThunkConfig>(
  "auth/updateUser",
  async (userData, thunkAPI) => {
    try {
      return await authService.updateUser(userData);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const uploadProfilePicture = createAsyncThunk<UserData, File, Record<string, never>>(
  "auth/uploadProfilePicture",
  async (file: File, thunkAPI) => {
    try {
      // Create FormData and append the file
      const formData = new FormData();
      formData.append("profilePicture", file);
      // Call the authService to upload the file
      return await authService.uploadProfilePicture(formData);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Handle error
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const removeProfilePicture = createAsyncThunk<
  void,
  void,
  { rejectValue: string } // Provide `rejectValue` type to handle errors
>("auth/removeProfilePicture", async (_, thunkAPI) => {
  try {
    await authService.removeProfilePicture();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Handle error
    const message =
      (error.response?.data?.message as string) ||
      error.message ||
      "Failed to remove profile picture";
    return thunkAPI.rejectWithValue(message);
  }
});

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
    builder // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      }) // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(uploadProfilePicture.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadProfilePicture.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(uploadProfilePicture.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(removeProfilePicture.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeProfilePicture.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (state.user) {
          state.user = { ...state.user, profilePicture: "" };
        }
      })
      .addCase(removeProfilePicture.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
