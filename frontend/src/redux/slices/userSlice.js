import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";
import Cookies from "js-cookie";

const initialState = {
  user: Cookies.get("frontAuthCookie") || null,
  error: null,
  loading: false,
  success: false,
};

export const register = createAsyncThunk(
  "user/register",
  async (newUser, thunkAPI) => {
    const data = await userService.register(newUser);
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    Cookies.set("frontAuthCookie", data.id, { expires: 0.01 });
    return data;
  }
);

export const login = createAsyncThunk("user/login", async (user, thunkAPI) => {
  const data = await userService.login(user);
  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }

  Cookies.set("frontAuthCookie", data.id, { expires: 0.01 });
  return data;
});

export const logout = createAsyncThunk(
  "user/logout",
  async (none, thunkAPI) => {
    const data = await userService.logout();

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    Cookies.remove("frontAuthCookie");
    return data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
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
        state.success = false;
        state.user = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        state.user = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.user = null;
      });
  },
});

export default userSlice.reducer;
