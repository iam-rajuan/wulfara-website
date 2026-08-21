import { apiSlice } from '../../api/apiSlice';
import type { ApiResponse, CmsPage } from '@/types/api';

export const cmsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPages: builder.query<ApiResponse<CmsPage[]>, void>({
      query: () => '/cms/pages',
      providesTags: ['Page'],
    }),
  }),
});

export const {
  useGetPagesQuery,
} = cmsApi;
