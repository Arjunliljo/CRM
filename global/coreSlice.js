import { createSlice } from "@reduxjs/toolkit";

const coreSlice = createSlice({
  name: "core",
  initialState: {
    branchNames: [],
    countryNames: [],
    roleNames: [],
    statusNames: [],
  },

  reducers: {
    setBranchNames: (state, action) => {
      state.branchNames = action.payload;
    },
    setCountryNames: (state, action) => {
      state.countryNames = action.payload;
    },
    setRoleNames: (state, action) => {
      state.roleNames = action.payload;
    },
    setStatusNames: (state, action) => {
      state.statusNames = action.payload;
    },
  },
});

export const { setBranchNames, setCountryNames, setRoleNames, setStatusNames } =
  coreSlice.actions;

export default coreSlice.reducer;
