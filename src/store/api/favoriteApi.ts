import { apiSlice } from './apiSlice';

export const favoriteApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFavorites: builder.query<any, void>({
      query: () => '/favorites',
      providesTags: ['Favorite'],
    }),
    addFavorite: builder.mutation<any, { supplierId: string }>({
      query: (data) => ({
        url: '/favorites',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Favorite'],
    }),
    removeFavorite: builder.mutation<any, string>({
      query: (id) => ({
        url: `/favorites/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Favorite'],
    }),
  }),
});

export const { useGetFavoritesQuery, useAddFavoriteMutation, useRemoveFavoriteMutation } = favoriteApi;
