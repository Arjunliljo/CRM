import { createSlice } from "@reduxjs/toolkit";

const creationSlice = createSlice({
  name: "creation",
  initialState: {
    isBranchEdit: false,
    editBranch: {},
    isCountryEdit: false,
    editCountry: {},
    isRoleEdit: false,
    editRole: {},

    countryNames: [],
    branchNames: [],
    roleNames: [],
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
    setRoleEdit: (state, action) => {
      state.isRoleEdit = action.payload.isRoleEdit;
      state.editRole = action.payload.editRole;
    },
  },
});

export const { setBranchEdit, setCountryEdit, setRoleEdit } = creationSlice.actions;
export default creationSlice.reducer;
