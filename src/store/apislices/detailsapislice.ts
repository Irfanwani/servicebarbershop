import authApiSlice from "./authapislices";

const detailsApiSlice = authApiSlice.injectEndpoints({
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
  }),
});

export const { useAddgeneraldetailsMutation } = detailsApiSlice;
