// /frontend/state/pizzaApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pizzaApi = createApi({
  reducerPath: 'pizzaApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9009/api' }),
  tagTypes: ['orders'],
  endpoints: (builder) => ({
    getOrderHistory: builder.query({
      query: () => '/pizza/history',
      providesTags:['orders'],
    }),
    submitOrder: builder.mutation({
      query: (newOrder) => ({
        url: '/pizza/order',
        method: 'POST',
        body: newOrder,
      }),
      invalidatesTags:['orders'],
    }),
  }),
});

export const { useGetOrderHistoryQuery, useSubmitOrderMutation } = pizzaApi;
