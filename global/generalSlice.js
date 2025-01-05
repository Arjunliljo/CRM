import { createSlice } from "@reduxjs/toolkit";

const generalSlice = createSlice({
  name: "general",
  initialState: {
    autoLeadsAssign: true,
  },
  reducers: {
    test: (state, action) => {
      state.autoLeadsAssign = action.payload;
    },
  },
});

export const { test } = generalSlice.actions;

export default generalSlice.reducer;
