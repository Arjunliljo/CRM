import { createSlice } from "@reduxjs/toolkit";

const coreSlice = createSlice({
  name: "core",
  initialState: {
    branchNames: [],
  },

  reducers: {
    setBranchNames: (state, action) => {
      state.branchNames = action.payload;
    },
  },
});

export const { setBranchNames } = coreSlice.actions;

export default coreSlice.reducer;
