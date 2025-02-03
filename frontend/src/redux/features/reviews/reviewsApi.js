import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utilis/baseURL';

const reviewApi = createApi({
  reducerPath: 'reviewapi',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:5000/api/reviews`,
    credentials: 'include',
  }),
  tagTypes: ['Reviews'],
  endpoints: (builder) => ({
    postReview: builder.mutation({
      query: (reviewData) => ({
        url: '/post-review', 
        method: 'POST',
        body: reviewData,
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: 'Reviews', id: postId },
      ],
    }),

    getReviewCount: builder.query({
      query: () => ({
        url: '/total-reviews',
      }),
    }),

    getReviewsByUserId: builder.query({
      query: (userId) => ({
        url: `/${userId}`,
      }),
      providesTags: (result) =>
        result ? [{ type: 'Reviews', id: result[0]?.email }] : [],
    }),
  }),
});

export const {
  usePostReviewMutation,
  useGetReviewCountQuery,
  useGetReviewsByUserIdQuery,
} = reviewApi;

export default reviewApi;
