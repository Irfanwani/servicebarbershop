import { serviceType } from "../../screens/mainscreens/types";
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
    getservices: builder.query({
      query: (id) => `/api/accounts/addservices?id=${id}`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        let data = [...baseQueryReturnValue];
        let res = {};
        data.forEach(({ service, cost, id }: serviceType) => {
          res[service] = { service, cost, id };
        });

        return res;
      },
      providesTags: ["services"],
    }),
  }),
});

export const { useGetappointmentsQuery, useGetservicesQuery } = mainApiSlice;
