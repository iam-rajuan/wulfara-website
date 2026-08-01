import { apiSlice } from './apiSlice';

export const supplierApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSuppliers: builder.query<any, string>({
      query: (queryString) => `/suppliers${queryString ? `?${queryString}` : ''}`,
      providesTags: ['Supplier'],
    }),
    getSupplierById: builder.query<any, string>({
      query: (id) => `/suppliers/${id}`,
      providesTags: (result, error, id) => [{ type: 'Supplier', id }],
    }),
  }),
});

export const { useGetSuppliersQuery, useGetSupplierByIdQuery } = supplierApi;
