import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: Cookies.get("frontAuthCookie") || null },
  reducers: {
    setCredentials: (state, action) => {
      const user = action.payload;
      Cookies.set("frontAuthCookie", user);
      state.user = user;
    },
    logout: (state) => {
      state.user = null;
      Cookies.remove("frontAuthCookie");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
