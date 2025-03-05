import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "applications",
  initialState: {
    applicationDetailToggle: false,
    curApplication: {},
    isApplying: false,
    toApplyApplications: [],
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
    setApplicationDetailToggle: (state, action) => {
      state.applicationDetailToggle = action.payload;
      if (!action.payload) {
        state.curApplication = {};
      }
    },
    setCurApplication: (state, action) => {
      state.curApplication = action.payload;

      if (action.payload) {
        state.applicationDetailToggle = true;
      }
    },
    setCurApplicationStatus: (state, action) => {
      state.curStatus = action.payload;
    },
    setCurApplicationSource: (state, action) => {
      state.curSource = action.payload;
    },
    setCurApplicationBranch: (state, action) => {
      state.curBranch = action.payload;
    },
    setCurApplicationCountry: (state, action) => {
      state.curCountry = action.payload;
    },
    setCurApplicationCampaign: (state, action) => {
      state.curCampaign = action.payload;
    },
    setCurApplicationRole: (state, action) => {
      state.curRole = action.payload;
    },
    setCurApplicationUser: (state, action) => {
      state.curUser = action.payload;
    },
  },
});

export const {
  setCurApplication,
  setCurApplicationStatus,
  setCurApplicationSource,
  setCurApplicationBranch,
  setCurApplicationCountry,
  setCurApplicationCampaign,
  setCurApplicationRole,
  setCurApplicationUser,
  setApplicationDetailToggle,
} = applicationSlice.actions;

export default applicationSlice.reducer;
