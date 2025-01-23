import { createSlice } from "@reduxjs/toolkit";

const creationSlice = createSlice({
  name: "creation",
  initialState: {
    isBranchEdit: false,
    editBranch: {},
    isCountryEdit: false,
    editCountry: {},

    countryNames: [],
    branchNames: [],
  },

  reducers: {
    setBranchEdit: (state, action) => {
      state.isBranchEdit = action.payload.isBranchEdit;
      state.editBranch = action.payload.editBranch;
    },
    setCountryEdit: (state, action) => {
      state.isCountryEdit = action.payload.isCountryEdit;
      state.editCountry = action.payload.editCountry;
    },
  },
});

export const { setBranchEdit, setCountryEdit } = creationSlice.actions;
export default creationSlice.reducer;
