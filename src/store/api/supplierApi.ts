import { apiSlice } from './apiSlice';
import type { ApiResponse, Supplier } from '@/types/api';

export const supplierApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSuppliers: builder.query<ApiResponse<Supplier[]>, string>({
      query: (queryString) => `/suppliers${queryString ? `?${queryString}` : ''}`,
      providesTags: ['Supplier'],
    }),
    getSupplierById: builder.query<ApiResponse<Supplier>, string>({
      query: (id) => `/suppliers/${id}`,
      providesTags: (result, error, id) => [{ type: 'Supplier', id }],
    }),
  }),
});

export const { useGetSuppliersQuery, useGetSupplierByIdQuery } = supplierApi;
