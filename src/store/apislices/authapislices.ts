import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

const { BASE_URL, BASE_URL_PROD } = Constants.expoConfig.extra;

const baseUrl =
  process.env.NODE_ENV == "development" ? BASE_URL : BASE_URL_PROD;

const transformResponse = async (baseQueryReturnValue: any) => {
  let res = { ...baseQueryReturnValue };
  res.token = null;
  await SecureStore.setItemAsync("token", baseQueryReturnValue.token);
  return res;
};

const authApiSlice = createApi({
  reducerPath: "authApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers) => {
      let token = await SecureStore.getItemAsync("token");
      if (token) {
        headers.set("Authorization", `Token ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/api/accounts/login",
        method: "POST",
        body,
      }),
      transformResponse,
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "/api/accounts/register",
        method: "POST",
        body,
      }),
      transformResponse,
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
      transformResponse,
    }),
    getsignupcode: builder.query({
      query: () => "/api/accounts/verifyemail",
    }),
    verifyemail: builder.mutation({
      query: (body) => ({
        url: "/api/accounts/verifyemail",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/api/accounts/logout/",
        method: "POST",
      }),
    }),

    logoutall: builder.mutation({
      query: () => ({
        url: "/api/accounts/logoutall/",
        method: "POST",
      }),
    }),
    deleteaccount: builder.mutation({
      query: (id) => ({
        url: `/api/accounts/deleteuser/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetresetcodeMutation,
  useResetpasswordMutation,
  useLazyGetsignupcodeQuery,
  useVerifyemailMutation,
  useLogoutMutation,
  useLogoutallMutation,
  useDeleteaccountMutation,
} = authApiSlice;

export default authApiSlice;
