import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "./newAuthSlice";
import { baseUrl } from "../../config/config";

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const error = result?.error?.data?.errors[0];
  if (error === "Access token expirado!") {
    // send refresh token to get new access token
    const refreshResult = await baseQuery("/token/refresh", api, extraOptions);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      // store the new token
      api.dispatch(setCredentials({ user }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else if (error === "Refresh token expirado!") {
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
