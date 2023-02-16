import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import Constants from "expo-constants";

const { BASE_URL, BASE_URL_PROD } = Constants.expoConfig.extra;

const baseUrl =
  process.env.NODE_ENV == "development" ? BASE_URL : BASE_URL_PROD;

const authApiSlice = createApi({
  reducerPath: "authApiSlice",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/api/accounts/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;

export default authApiSlice;
