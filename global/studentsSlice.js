import { createSlice } from "@reduxjs/toolkit";

const studentsSlice = createSlice({
  name: "students",
  initialState: {
    autoStudentsAssign: false,
    curStudent: {},
    isAssigning: false,
    toAssignStudents: [],
    curStatus: "All Status",
    curSource: "All Source",
    curBranch: "All Branch",
    curCountry: "All Country",
  },
  reducers: {
    setAutoStudentsAssign: (state, action) => {
      state.autoStudentsAssign = action.payload;

      if (!action.payload) {
        state.curStudent = {};
      }
    },
    setCurStudent(state, action) {
      state.curStudent = action.payload;

      if (action.payload) {
        state.autoStudentsAssign = true;
      }
    },
  },
});

export const { setAutoStudentsAssign, setCurStudent } = studentsSlice.actions;

export default studentsSlice.reducer;
