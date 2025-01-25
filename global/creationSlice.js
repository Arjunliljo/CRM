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
    isStatusEdit: false,
    editStatus: {},
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
    setStatusEdit: (state, action) => {
      state.isStatusEdit = action.payload.isStatusEdit;
      state.editStatus = action.payload.editStatus;
    },
  },
});

export const { setBranchEdit, setCountryEdit, setRoleEdit, setStatusEdit } =
  creationSlice.actions;
export default creationSlice.reducer;
