import { getBaseUrl } from '../../../utilis/baseURL';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:5000/api/products`,
    credentials: 'include',
  }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    fetchAllProducts: builder.query({
      query: ({
        category,
        color,
        minPrice,
        maxPrice,
        page = 1,
        limit = 10,
      }) => {
        const queryParams = new URLSearchParams();
        if (category) queryParams.append('category', category);
        if (color) queryParams.append('color', color);
        if (minPrice) queryParams.append('minPrice', minPrice);
        if (maxPrice) queryParams.append('maxPrice', maxPrice);
        queryParams.append('page', page.toString());
        queryParams.append('limit', limit.toString());
        return `/?${queryParams.toString()}`;
      },
      providesTags: ['Products'],
    }),

    fetchProductById: builder.query({
      query: (id) => `${id}`,
      providesTags: (result, error, id) => [{ type: 'Products', id }],
    }),

    AddProduct: builder.mutation({
      query: (newProduct) => ({
        url: '/create-product',
        method: 'POST',
        body: newProduct,
        credentials: 'include',
      }),
      invalidatesTags: ['Products'],
    }),

    fetchRelatedProducts: builder.query({
      query: (id) => `/related/${id}`,
    }),

    updateProduct: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/update-product/${id}`,
        method: 'PATCH',
        body: rest,
        credentials: 'include',
      }),
      invalidatesTags: ['Products'],
    }),

    deleteProducts: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Products', id }],
    }),
  }),
});
export const {
  useFetchAllProductsQuery,
  useFetchProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useFetchRelatedProductsQuery,
} = productsApi;

export default productsApi;
