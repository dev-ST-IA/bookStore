import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  message: "Something Went Wrong",
  severity: "error",
  navigateTo: null,
  duration: 3000,
};

export const toasterSlice = createSlice({
  name: "toaster",
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
      if (!action.payload) {
        state.duration = 3000;
        state.navigateTo = null;
      }
    },
    setToaster: (state, action) => {
      const { message, severity, navigateTo } = action.payload;
      state.open = true;
      state.message = message;
      state.severity = severity;
      if (navigateTo) {
        state.navigateTo = navigateTo;
      } else {
        state.navigateTo = null;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOpen, setToaster } = toasterSlice.actions;

export default toasterSlice.reducer;
