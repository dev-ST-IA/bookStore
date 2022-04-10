import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
};

export const searchBarSlice = createSlice({
  name: "searchBar",
  initialState,
  reducers: {
    addSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addSearch } = searchBarSlice.actions;

export default searchBarSlice.reducer;
