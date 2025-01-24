import { createSlice } from "@reduxjs/toolkit";

const coreSlice = createSlice({
  name: "core",
  initialState: {
    branchNames: [],
    countryNames: [],
  },

  reducers: {
    setBranchNames: (state, action) => {
      state.branchNames = action.payload;
    },
    setCountryNames: (state, action) => {
      state.countryNames = action.payload;
    },
  },
});

export const { setBranchNames, setCountryNames } = coreSlice.actions;

export default coreSlice.reducer;
