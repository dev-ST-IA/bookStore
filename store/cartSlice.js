import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  total: "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action) => {
      state.products = [...state.products, action.payload];
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter((i) => i.id != action.payload.id);
    },
    update: (state, action) => {
      const index = action.payload.index;
      const obj = action.payload.object;
      state.products = [
        ...state.products.slice(0, index),
        obj,
        ...state.products.slice(index + 1),
      ];
    },
    updateTotalPrice: (state, action) => {
      state.total = action.payload;
    },
    updateCart: (state, action) => {
      state.products = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { add, deleteProduct, update, updateTotalPrice, updateCart } =
  cartSlice.actions;

export default cartSlice.reducer;
