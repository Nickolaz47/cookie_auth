// Redux
import { configureStore } from "@reduxjs/toolkit";
// Slices
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});
