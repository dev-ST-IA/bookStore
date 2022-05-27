import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderPlaced: false,
};

export const placeOrderSlice = createSlice({
  name: "placeOrder",
  initialState,
  reducers: {
    setPlace: (state, action) => {
      state.orderPlaced = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPlace } = placeOrderSlice.actions;

export default placeOrderSlice.reducer;
