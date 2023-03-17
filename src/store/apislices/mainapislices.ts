import authApiSlice from "./authapislices";

export const mainApiSlice = authApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getappointments: builder.query({
      query: ({ page_no, search }) =>
        `/api/haircut/appointments?page_no=${page_no}&search=${search}`,

      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge(currentCacheData, responseData, otherArgs) {
        if (otherArgs.arg.page_no == 1 || otherArgs.arg.search) {
          return responseData;
        }
        currentCacheData.push(...responseData);
      },
    }),
  }),
});

export const { useGetappointmentsQuery } = mainApiSlice;
