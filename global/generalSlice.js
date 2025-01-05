import { createSlice } from "@reduxjs/toolkit";

const generalSlice = createSlice({
  name: "general",
  initialState: {
    autoLeadsAssign: true,
  },
  reducers: {
    setAutoLeadsAssign: (state, action) => {
      state.autoLeadsAssign = action.payload;
    },
  },
});

export const { setAutoLeadsAssign } = generalSlice.actions;

export default generalSlice.reducer;
