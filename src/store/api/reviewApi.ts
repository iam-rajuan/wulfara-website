import { apiSlice } from "./apiSlice";

export const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSupplierReviews: builder.query({
      query: (supplierId: string) => `/reviews/supplier/${supplierId}`,
      providesTags: ["Review"],
    }),
  }),
});

export const { useGetSupplierReviewsQuery } = reviewApi;
