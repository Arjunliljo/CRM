import { createSlice } from "@reduxjs/toolkit";

const leadsSlice = createSlice({
  name: "leads",
  initialState: {
    autoLeadsAssign: false,
    leadDetailToggle: false,
    curLead: {},
    isAssigning: false,
    toAssignLeads: [],
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
    updateLeadRemark(state, action) {
      // console.log(action.payload, "action.payload");
      state.curLead.remark = action.payload;
    },
    updateLeadStatus(state, action) {
      state.curLead = action.payload;
    },
    setIsAssigning: (state, action) => {
      state.isAssigning = action.payload;
    },
    setToAssignLeads: (state, action) => {
      state.toAssignLeads = action.payload;
    },
    updateCurLead: (state, action) => {
      state.curLead = action.payload;
    },
  },
});

export const {
  setAutoLeadsAssign,
  setCurLead,
  updateCurLeadDocuments,
  removeCurLeadDocument,
  setLeadDetailToggle,
  updateLeadRemark,
  updateLeadStatus,
  setIsAssigning,
  setToAssignLeads,
  updateCurLead,
} = leadsSlice.actions;

export default leadsSlice.reducer;
