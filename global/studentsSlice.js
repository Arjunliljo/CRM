import { createSlice } from "@reduxjs/toolkit";

const studentsSlice = createSlice({
  name: "students",
  initialState: {
    studentDetailToggle: false,
    curStudent: {},
    curApplications: [],
    isAssigning: false,
    toAssignStudents: [],
    curStatus: "All Status",
    curSource: "All Source",
    curBranch: "All Branch",
    curCountry: "All Country",
    curCampaign: "All Campaigns",
    curRole: "All Role",
    curUser: "All User",
  },
  reducers: {
    setCurApplications: (state, action) => {
      state.curApplications = action.payload;
    },
    setStudentCurBranch: (state, action) => {
      state.curBranch = action.payload;
    },
    setStudentCurStatus: (state, action) => {
      state.curStatus = action.payload;
    },
    setStudentCurSource: (state, action) => {
      state.curSource = action.payload;
    },
    setStudentCurCampaigns: (state, action) => {
      state.curCampaign = action.payload;
    },
    setStudentCurCountry: (state, action) => {
      state.curCountry = action.payload;
    },
    setStudentCurRole: (state, action) => {
      state.curRole = action.payload;
    },
    setStudentCurUser: (state, action) => {
      state.curUser = action.payload;
    },
    setStudentDetailToggle: (state, action) => {
      state.studentDetailToggle = action.payload;

      if (!action.payload) {
        state.curStudent = {};
      }
    },
    setStudentIsAssigning: (state, action) => {
      state.isAssigning = action.payload;
      if (!state.isAssigning) {
        state.toAssignStudents = [];
      }
    },
    setToAssignStudents: (state, action) => {
      state.toAssignStudents = action.payload;
    },

    setCurStudent(state, action) {
      state.curStudent = action.payload;

      if (action.payload) {
        state.studentDetailToggle = true;
      } else {
        state.studentDetailToggle = false;
      }
    },
  },
});

export const {
  setCurApplications,
  setCurStudent,
  setStudentCurBranch,
  setStudentCurStatus,
  setStudentCurSource,
  setStudentCurCampaigns,
  setStudentCurCountry,
  setStudentCurRole,
  setStudentCurUser,
  setStudentDetailToggle,
  setStudentIsAssigning,
  setToAssignStudents,
} = studentsSlice.actions;

export default studentsSlice.reducer;
