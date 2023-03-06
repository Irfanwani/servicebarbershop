import authApiSlice from "./authapislices";

export const detailsApiSlice = authApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addgeneraldetails: builder.mutation({
      query: (body) => ({
        url: "/api/accounts/barberdetails",
        method: "POST",
        body,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    }),
    addbankdetails: builder.mutation({
      query: (body) => ({
        url: "/api/accounts/createbank",
        method: "POST",
        body,
      }),
    }),
    addserviceDetails: builder.mutation({
      query: (body) => ({
        url: "/api/accounts/addservices",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useAddgeneraldetailsMutation,
  useAddbankdetailsMutation,
  useAddserviceDetailsMutation,
} = detailsApiSlice;
