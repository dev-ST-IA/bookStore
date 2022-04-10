import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  category: -1,
  Page: 1,
  Size: 12,
  Sort: "popular",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addSort: (state, action) => {
      state.Sort = action.payload;
    },
    addCategory: (state, action) => {
      state.category = action.payload;
    },
    addPage: (state, action) => {
      state.Page = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addSort, addCategory, addPage, addSearch } = searchSlice.actions;

export default searchSlice.reducer;
