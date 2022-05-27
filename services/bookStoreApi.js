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
  tagTypes: ["Books", "User", "Orders", "Cart", "Comments"],
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
        // return [{ type: "Books", id: "LIST" }];
        return result
          ? [
              ...result?.books?.map((book) => ({
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
      providesTags: (result) => [{ type: "Books", id: "LIST" }],
    }),
    getAllCategories: builder.query({
      query: () => "category/getAll",
      transformResponse: (response, meta, arg) => response,
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
        return response.books;
      },
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "user/login/customer",
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
        url: "user/create/customer",
        method: "POST",
        body: body,
      }),
      transformResponse: (result, meta, arg) => {
        return result;
      },
      invalidatesTags: ["User"],
    }),
    getUser: builder.query({
      query: () => "user/get",
      providesTags: (result) => ["User"],
      transformResponse: (result, meta, arg) => {
        return result;
      },
    }),
    getComments: builder.query({
      query: (options) => {
        const { Size, Page, id } = options;
        return {
          url: `book/${id}/comment`,
          params: { Size, Page },
        };
      },
      transformResponse: (response, meta, arg) => {
        return response;
      },
      providesTags: (result) => {
        return [{ type: "Comments", id: result.bookId }];
      },
    }),
    commentBook: builder.mutation({
      query: ({ id, comment }) => ({
        url: `book/${id}/comment`,
        method: "POST",
        params: {
          comment: comment,
        },
      }),
      transformResponse: (result, meta, arg) => {
        return result;
      },
      invalidatesTags: (result) => [{ type: "Comments", id: result.id }],
    }),
    rateBook: builder.mutation({
      query: ({ id, rate }) => ({
        url: `book/rate/${id}`,
        method: "PUT",
        params: {
          rate: rate,
        },
      }),
      transformResponse: (result, meta, arg) => {
        return result;
      },
      invalidatesTags: (result) => [{ type: "Books", id: result.Id }],
    }),
    getBookRating: builder.query({
      query: ({ id }) => `book/rate/${id}`,
      transformResponse: (result, meta, arg) => {
        return result.rating;
      },
      providesTags: (result) => {
        return [{ type: "Books", id: result?.bookId }];
      },
    }),
    starBook: builder.mutation({
      query: ({ id }) => ({
        url: `user/star/${id}`,
        method: "PUT",
      }),
      transformResponse: (result, meta, arg) => {
        return result;
      },
      invalidatesTags: (result) => [{ type: "Books", id: result.Id }],
    }),
    isStarBook: builder.query({
      query: ({ id }) => `user/star/${id}`,
      transformResponse: (result, meta, arg) => {
        return result;
      },
      providesTags: (result) =>
        result?.book?.Id
          ? [{ type: "Books", id: result?.book?.Id }]
          : [{ type: "Books", id: "LIST" }],
    }),
    getStarredBooks: builder.query({
      query: (options) => {
        const { Size, Sort, Page, category } = options;
        return {
          url: "user/starred",
          params: { Size, Sort, Page, category },
        };
      },
      transformResponse: (response, meta, arg) => {
        return response;
      },
      providesTags: (result) => {
        // return [{ type: "Books", id: "LIST" }];
        return result
          ? [
              ...result.books?.map((book) => ({
                type: "Books",
                id: book.id,
              })),
              { type: "Books", id: "LIST" },
            ]
          : [{ type: "Books", id: "LIST" }];
      },
    }),
    // cart
    getCart: builder.query({
      query: () => "cart/get",
      transformResponse: (result) => {
        const products = result;
        const cartItems = products.map((product) => {
          const values = {
            id: product.product.id,
            title: product.product.title,
            author: product.product.author,
            price: product.product.price,
            units: product.product.units,
            publisher: product.product.publisher,
            quantity: product.quantity,
            totalPrice: product.totalPrice,
          };
          return values;
        });
        return cartItems;
      },
      providesTags: (result) => [{ type: "Cart", id: "LIST" }],
    }),
    addProductToCart: builder.mutation({
      query: ({ productId, quantity }) => {
        return {
          url: `cart/add/${productId}/${quantity}`,
          method: "PUT",
        };
      },
      invalidatesTags: (result) => [{ type: "Cart", id: "LIST" }],
    }),
    deleteProductInCart: builder.mutation({
      query: (id) => {
        console.log(id);
        return {
          url: `cart/delete/${id}`,
          method: "PUT",
        };
      },
      invalidatesTags: (result) => [{ type: "Cart", id: "LIST" }],
    }),
    editProductInCart: builder.mutation({
      query: ({ productId, quantity }) => {
        return {
          url: `cart/edit/${productId}/${quantity}`,
          method: "PUT",
        };
      },
      invalidatesTags: (result) => [{ type: "Cart", id: "LIST" }],
    }),
    clearProductsInCart: builder.mutation({
      query: () => {
        return {
          url: `cart/clear`,
          method: "PUT",
        };
      },
      invalidatesTags: (result) => [{ type: "Cart", id: "LIST" }],
    }),

    // order
    placeOrder: builder.mutation({
      query: () => {
        return {
          url: "order/place",
          method: "POST",
        };
      },
      invalidatesTags: (result) => {
        return [
          {
            type: "Books",
            id: "LIST",
          },
          {
            type: "Orders",
            id: "LIST",
          },
          {
            type: "Cart",
            id: "LIST",
          },
        ];
      },
    }),
    getAllOrders: builder.query({
      query: (options) => {
        const { Size, Sort, Page, category, search } = options;
        const qParams = { Size, Sort, Page, category };
        if (search != null && search != "") {
          qParams.search = search;
        }
        return {
          url: "order/getAll/",
          params: qParams,
        };
      },
      transformResponse: (result) => {
        return {
          rows: result?.orders,
          totalPages: result?.totalPages,
        };
      },
      providesTags: (result) => {
        return result
          ? [
              ...result.rows.map((book) => ({
                type: "Orders",
                id: book.id,
              })),
              { type: "Orders", id: "LIST" },
            ]
          : [{ type: "Orders", id: "LIST" }];
      },
    }),
    editOrder: builder.mutation({
      query: ({ id, status }) => {
        return {
          url: `order/put/${id}`,
          method: "PUT",
          params: {
            status: status,
          },
        };
      },
      invalidatesTags: (result) => [{ type: "Orders", id: "LIST" }],
    }),
    getOrder: builder.query({
      query: (id) => `order/get/${id}`,
      transformResponse: (response, meta, arg) => {
        console.log(response);
        const cartProducts = response.cartProducts;
        const filteredCartProducts = cartProducts.map((item) => ({
          ...item,
          id: item.product.id,
        }));
        console.log(response);
        return {
          ...response,
          cartProducts: filteredCartProducts,
        };
      },
      providesTags: (result) => [{ type: "Books", id: result?.id }],
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
  useGetCartQuery,
  useAddProductToCartMutation,
  useClearProductsInCartMutation,
  useDeleteProductInCartMutation,
  useEditProductInCartMutation,
  useEditOrderMutation,
  useGetAllOrdersQuery,
  usePlaceOrderMutation,
  useGetOrderQuery,
  useCommentBookMutation,
  useGetBookRatingQuery,
  useGetCommentsQuery,
  useRateBookMutation,
  useGetStarredBooksQuery,
  useIsStarBookQuery,
  useStarBookMutation,
} = bookStoreApi;
