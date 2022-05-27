import { createSlice } from "@reduxjs/toolkit";

const modelSlice = createSlice({
  name: "modelSlice",
  initialState: {
    createOpen: false,
    editOpen: false,
    deleteOpen: false,
    viewImageOpen: false,
  },

  reducers: {
    setCreateOpen: (state, action) => {
      state.createOpen = action.payload;
    },
    setEditOpen: (state, action) => {
      state.editOpen = action.payload;
    },
    setDeleteOpen: (state, action) => {
      state.deleteOpen = action.payload;
    },
    setViewImageOpen: (state, action) => {
      state.viewImageOpen = action.payload;
    },
  },
});
export const { setCreateOpen, setDeleteOpen, setEditOpen, setViewImageOpen } =
  modelSlice.actions;
export default modelSlice.reducer;
