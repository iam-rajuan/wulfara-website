import { apiSlice } from "./apiSlice";
import type { ApiResponse, Review } from "@/types/api";

export const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSupplierReviews: builder.query<ApiResponse<Review[]>, string>({
      query: (supplierId: string) => `/reviews/supplier/${supplierId}`,
      providesTags: ["Review"],
    }),
  }),
});

export const { useGetSupplierReviewsQuery } = reviewApi;
