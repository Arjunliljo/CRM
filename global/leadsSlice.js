import { createSlice } from "@reduxjs/toolkit";

const leadsSlice = createSlice({
  name: "leads",
  initialState: {
    autoLeadsAssign: false,
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
    updateCurLeadDocuments(state, action) {
      state.curLead.documents = state.curLead.documents.filter(
        doc => doc._id !== action.payload
      );
    },
  },
});

export const { setAutoLeadsAssign, setCurLead , updateCurLeadDocuments} = leadsSlice.actions;

export default leadsSlice.reducer;