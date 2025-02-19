import { createSlice } from "@reduxjs/toolkit";

const leadsSlice = createSlice({
  name: "leads",
  initialState: {
    autoLeadsAssign: false,
    leadDetailToggle: false,
    curLead: {},
  },
  reducers: {
    setAutoLeadsAssign: (state, action) => {
      state.autoLeadsAssign = action.payload;
    },
    setCurLead(state, action) {
      state.curLead = action.payload;

      if (action.payload) {
        state.leadDetailToggle = true;
      }
    },
    setLeadDetailToggle: (state, action) => {
      state.leadDetailToggle = action.payload;

      if (!action.payload) {
        state.curLead = {};
      }
    },
    removeCurLeadDocument(state, action) {
      state.curLead.documents = state.curLead.documents.filter(
        (doc) => doc._id !== action.payload
      );
    },
    updateCurLeadDocuments(state, action) {
      state.curLead.documents = action.payload;
    },
  },
});

export const {
  setAutoLeadsAssign,
  setCurLead,
  updateCurLeadDocuments,
  removeCurLeadDocument,
  setLeadDetailToggle,
} = leadsSlice.actions;

export default leadsSlice.reducer;
