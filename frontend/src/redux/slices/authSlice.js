import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";
import Cookies from "js-cookie";

const initialState = {
  user: Cookies.get("frontAuthCookie") || null,
  error: null,
  loading: false,
};

export const register = createAsyncThunk(
  "auth/register",
  async (newUser, thunkAPI) => {
    const data = await authService.register(newUser);
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    // Almost 1 minute
    Cookies.set("frontAuthCookie", data.id, { expires: 0.000694444 });
    return data;
  }
);

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  const data = await authService.login(user);
  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }
  // Almost 1 minute
  Cookies.set("frontAuthCookie", data.id, { expires: 0.000694444 });
  return data;
});

export const logout = createAsyncThunk(
  "auth/logout",
  async (none, thunkAPI) => {
    const data = await authService.logout();

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    Cookies.remove("frontAuthCookie");
    return data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
