import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
};

export const toasterSlice = createSlice({
  name: "toaster",
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOpen } = toasterSlice.actions;

export default toasterSlice.reducer;
