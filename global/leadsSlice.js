import { createSlice } from "@reduxjs/toolkit";

const leadsSlice = createSlice({
  name: "leads",
  initialState: {
    autoLeadsAssign: false,
    leadDetailToggle: false,
    curLead: {},
    isAssigning: false,
    toAssignLeads: [],
    curUniversity: {},
    curStatus: "All Status",
    curSource: "All Source",
    curBranch: "All Branch",
    curCountry: "All Country",
    curCampaign: "All Campaigns",
    curRole: "All Role",
    curUser: "All User",
  },
  reducers: {
    setCurUniversity: (state, action) => {
      state.curUniversity = action.payload;
    },
    setLeadCurRole: (state, action) => {
      state.curRole = action.payload;
    },
    setLeadCurUser: (state, action) => {
      state.curUser = action.payload;
    },
    setLeadCurCampaigns: (state, action) => {
      state.curCampaign = action.payload;
    },
    setLeadCurCountry: (state, action) => {
      state.curCountry = action.payload;
    },
    setLeadsCurStatus: (state, action) => {
      state.curStatus = action.payload;
    },
    setLeadsCurSource: (state, action) => {
      state.curSource = action.payload;
    },
    setLeadsCurBranch: (state, action) => {
      state.curBranch = action.payload;
    },

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
    setIsUniversitySelected: (state, action) => {
      state.isUniversitySelected = action.payload;
    },
  },
});

export const {
  setAutoLeadsAssign,
  setCurLead,
  setLeadCurCountry,
  updateCurLeadDocuments,
  removeCurLeadDocument,
  setLeadDetailToggle,
  updateLeadRemark,
  updateLeadStatus,
  setIsAssigning,
  setToAssignLeads,
  updateCurLead,
  setIsUniversitySelected,
  setLeadsCurStatus,
  setLeadsCurSource,
  setLeadsCurBranch,
  setLeadCurCampaigns,
  setLeadCurRole,
  setLeadCurUser,
  setCurUniversity,
} = leadsSlice.actions;

export default leadsSlice.reducer;
