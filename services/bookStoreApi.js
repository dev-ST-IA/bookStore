// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const bookStoreApi = createApi({
  reducerPath: "bookStoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Books", "User"],
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: (options) => {
        const { Size, Sort, Page, category } = options;
        return {
          url: "book/getAll/",
          params: { Size, Sort, Page, category },
        };
      },
      transformResponse: (response, meta, arg) => {
        return response;
      },
      providesTags: (result) => {
        return result
          ? [
              ...result.books["$values"].map((book) => ({
                type: "Books",
                id: book.id,
              })),
              { type: "Books", id: "LIST" },
            ]
          : [{ type: "Books", id: "LIST" }];
      },
    }),
    getBook: builder.query({
      query: (id) => `book/get/${id}`,
      transformResponse: (response, meta, arg) => {
        return response;
      },
      providesTags: (result) => [{ type: "Books", id: result.id }],
    }),
    getAllCategories: builder.query({
      query: () => "category/getAll",
      transformResponse: (response, meta, arg) => response["$values"],
      providesTags: (result) => [{ type: "Books", id: "LIST" }],
    }),
    getAllBooksSearch: builder.query({
      query: (search) => {
        return {
          url: "book/getAll/",
          params: { search },
        };
      },
      transformResponse: (response, meta, arg) => {
        return response.books["$values"];
      },
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "user/login",
        method: "POST",
        body: body,
      }),
      transformResponse: (result, meta, args) => {
        return result;
      },
      invalidatesTags: ["User"],
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "user/create",
        method: "POST",
        body: body,
      }),
      transformResponse: (result, meta, arg) => {
        return result;
      },
      invalidatesTags: ["User"],
    }),
    getUser: builder.query({
      query: "user/get",
      providesTags: (result) => ["User"],
      transformResponse: (result, meta, arg) => {
        return result;
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllBooksQuery,
  useGetBookQuery,
  useGetAllCategoriesQuery,
  useGetAllBooksSearchQuery,
  useGetUserQuery,
  useLoginMutation,
  useRegisterMutation,
} = bookStoreApi;
