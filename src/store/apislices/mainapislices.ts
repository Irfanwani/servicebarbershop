import authApiSlice from "./authapislices";

const mainApiSlice = authApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getappointments: builder.query({
      query: () => "/api/haircut/appointments",
    }),
  }),
});

export const { useGetappointmentsQuery } = mainApiSlice;
