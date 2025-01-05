import { createSlice } from "@reduxjs/toolkit";

const leadsSlice = createSlice({
  name: "leads",
  initialState: {
    autoLeadsAssign: true,
    curLead: {},
  },
  reducers: {
    setAutoLeadsAssign: (state, action) => {
      state.autoLeadsAssign = action.payload;

      if (!action.payload) {
        state.curLead = {};
      }
    },
    setCurLead(state, action) {
      state.curLead = action.payload;

      if (action.payload) {
        state.autoLeadsAssign = true;
      }
    },
  },
});

export const { setAutoLeadsAssign, setCurLead } = leadsSlice.actions;

export default leadsSlice.reducer;
