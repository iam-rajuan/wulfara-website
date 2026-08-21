import { apiSlice } from './apiSlice';
import type { ApiMessageResponse, ApiResponse, Favorite } from '@/types/api';

export const favoriteApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFavorites: builder.query<ApiResponse<Favorite[]>, void>({
      query: () => '/favorites',
      providesTags: ['Favorite'],
    }),
    addFavorite: builder.mutation<ApiResponse<Favorite>, { supplierId: string }>({
      query: (data) => ({
        url: '/favorites',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Favorite'],
    }),
    removeFavorite: builder.mutation<ApiMessageResponse, string>({
      query: (id) => ({
        url: `/favorites/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Favorite'],
    }),
  }),
});

export const { useGetFavoritesQuery, useAddFavoriteMutation, useRemoveFavoriteMutation } = favoriteApi;
