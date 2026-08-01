import { apiSlice } from './apiSlice';

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<any, void>({
      query: () => '/categories',
      providesTags: ['Category'],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
