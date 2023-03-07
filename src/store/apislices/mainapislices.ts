import authApiSlice from "./authapislices";

const mainApiSlice = authApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getappointments: builder.query({
      query: (page_no: number) =>
        `/api/haircut/appointments?page_no=${page_no}`,

      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge(currentCacheData, responseData, otherArgs) {
        if (otherArgs.arg == 1) {
          return responseData;
        }
        currentCacheData.push(...responseData);
      },
    }),
  }),
});

export const { useGetappointmentsQuery } = mainApiSlice;
