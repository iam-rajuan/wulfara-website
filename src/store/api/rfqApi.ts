import { apiSlice } from './apiSlice';
import type { ApiResponse, Rfq, UploadUrlData } from '@/types/api';

export interface CreateRfqPayload {
  [key: string]: unknown;
}

export const rfqApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRfq: builder.mutation<ApiResponse<Rfq>, CreateRfqPayload>({
      query: (rfqData) => ({
        url: '/rfqs',
        method: 'POST',
        body: rfqData,
      }),
      invalidatesTags: ['RFQ'],
    }),
    getBuyerRfqs: builder.query<ApiResponse<Rfq[]>, void>({
      query: () => '/rfqs/buyer',
      providesTags: ['RFQ'],
    }),
    getRfqUploadUrl: builder.mutation<ApiResponse<UploadUrlData>, { contentType: string }>({
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
