import { apiSlice } from './apiSlice';
import type { ApiResponse, Category } from '@/types/api';

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<ApiResponse<Category[]>, void>({
      query: () => '/categories',
      providesTags: ['Category'],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
