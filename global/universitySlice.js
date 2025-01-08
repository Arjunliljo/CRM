import { createSlice } from "@reduxjs/toolkit";

const studentsSlice = createSlice({
  name: "university",
  initialState: {
    autoStudentsAssign: true,
    curStudent: {},
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
