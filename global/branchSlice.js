import { createSlice } from "@reduxjs/toolkit";

const branchSlice = createSlice({
  name: "branchmanage",
  initialState: {
    autoBranchmanageAssign: false,
    curBranchmanage: {},
  },
  reducers: {
    setAutoBranchmanageAssign: (state, action) => {
      state.autoBranchmanageAssign = action.payload;

      if (!action.payload) {
        state.curBranchmanage = {};
      }
    },
    setCurBranchmanage(state, action) {
      state.curBranchmanage = action.payload;

      if (action.payload) {
        state.autoBranchmanageAssign = true;
      }
    },
  },
});

export const { setAutoBranchmanageAssign, setCurBranchmanage } =
  branchSlice.actions;

export default branchSlice.reducer;
