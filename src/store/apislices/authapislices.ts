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
    register: builder.mutation({
      query: (body) => ({
        url: "/api/accounts/register",
        method: "POST",
        body,
      }),
    }),
    getresetcode: builder.mutation({
      query: (body) => ({
        url: "/api/accounts/passwordreset",
        method: "POST",
        body,
      }),
    }),
    resetpassword: builder.mutation({
      query: (body) => ({
        url: "/api/accounts/passwordreset",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetresetcodeMutation,
  useResetpasswordMutation,
} = authApiSlice;

export default authApiSlice;
