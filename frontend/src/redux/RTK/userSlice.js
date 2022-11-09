import { apiSlice } from "./apiSlice";

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserData: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserDataMutation } = userSlice;
