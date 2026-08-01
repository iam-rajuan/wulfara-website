import { apiSlice } from './apiSlice';

export const rfqApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRfq: builder.mutation<any, any>({
      query: (rfqData) => ({
        url: '/rfqs',
        method: 'POST',
        body: rfqData,
      }),
      invalidatesTags: ['RFQ'],
    }),
  }),
});

export const { useCreateRfqMutation } = rfqApi;
