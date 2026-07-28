import { apiSlice } from '../../api/apiSlice';

export const cmsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPages: builder.query({
      query: () => '/cms/pages',
      providesTags: ['Page'],
    }),
  }),
});

export const {
  useGetPagesQuery,
} = cmsApi;
