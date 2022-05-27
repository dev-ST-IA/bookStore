import { createSlice } from "@reduxjs/toolkit";


const themeModeSlice = createSlice({
  name: "themeModeSlice",
  initialState: {
   mode: 'light',

  },

  reducers: {
    setMode: (state,actions)=> {
        state.mode = actions.payload
    }
    
  },
});
export const { setMode } = themeModeSlice.actions;
export default themeModeSlice.reducer;
