import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./RTK/apiSlice";
import { userSlice } from "./RTK/userSlice";
import authReducer from "./RTK/newAuthSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(userSlice.middleware),
});
