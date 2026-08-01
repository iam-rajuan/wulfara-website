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
    getBuyerRfqs: builder.query<any, void>({
      query: () => '/rfqs/buyer',
      providesTags: ['RFQ'],
    }),
    getRfqUploadUrl: builder.mutation<any, { contentType: string }>({
      query: (data) => ({
        url: '/rfqs/upload-url',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { 
  useCreateRfqMutation, 
  useGetBuyerRfqsQuery, 
  useGetRfqUploadUrlMutation 
} = rfqApi;
