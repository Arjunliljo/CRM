import { createSlice } from "@reduxjs/toolkit";

const creationSlice = createSlice({
  name: "creation",
  initialState: {
    isBranchEdit: false,
    editBranch: {},
  },

  reducers: {
    setBranchEdit: (state, action) => {
      state.isBranchEdit = action.payload.isBranchEdit;
      state.editBranch = action.payload.newBranch;
    },
  },
});

export const { setBranchEdit } = creationSlice.actions;

export default creationSlice.reducer;
