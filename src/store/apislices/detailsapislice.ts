import authApiSlice from "./authapislices";

export const detailsApiSlice = authApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addgeneraldetails: builder.mutation({
      query: ({ body, method }) => ({
        url: "/api/accounts/barberdetails",
        method,
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
      query: ({ body, method }) => ({
        url: "/api/accounts/addservices",
        method,
        body,
      }),
      invalidatesTags: ["services"],
    }),
  }),
});

export const {
  useAddgeneraldetailsMutation,
  useAddbankdetailsMutation,
  useAddserviceDetailsMutation,
} = detailsApiSlice;
