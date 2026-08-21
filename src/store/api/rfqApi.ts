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
    getRfqById: builder.query<ApiResponse<Rfq>, string>({
      query: (id) => `/rfqs/${id}`,
      providesTags: (result, error, id) => [{ type: 'RFQ', id }],
    }),
    getRfqUploadUrl: builder.mutation<ApiResponse<UploadUrlData>, { contentType: string }>({
      query: (data) => ({
        url: '/rfqs/upload-url',
        method: 'POST',
        body: data,
      }),
    }),
    getRfqMessages: builder.query<ApiResponse<unknown[]>, string>({
      query: (id) => `/rfqs/${id}/messages`,
      providesTags: (result, error, id) => [{ type: 'RFQ', id }],
    }),
    getRfqAttachmentDownloadUrl: builder.query<ApiResponse<{ downloadUrl: string }>, string>({
      query: (url) => `/rfqs/download?url=${encodeURIComponent(url)}`,
    }),
  }),
});

export const { 
  useCreateRfqMutation, 
  useGetBuyerRfqsQuery, 
  useGetRfqByIdQuery,
  useGetRfqUploadUrlMutation,
  useGetRfqMessagesQuery,
  useLazyGetRfqAttachmentDownloadUrlQuery
} = rfqApi;
