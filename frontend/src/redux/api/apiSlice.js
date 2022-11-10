import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {  logout } from "../auth/authSlice";
import { baseUrl } from "../config/config";

// Setting the base config for the API resquests
const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
});

// Creating a base query that will get a new access token when the
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const error = result?.error?.data?.errors[0];
  if (error === "Access token expirado!") {
    // Send refresh token to get a new access token
    const refreshResult = await baseQuery("/token/refresh", api, extraOptions);
    if (refreshResult?.data) {
      // Retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
      return result;
    } else {
      await baseQuery("/logout", api, extraOptions);
      api.dispatch(logout());
    }
  }

  if (error) {
    return { error };
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
