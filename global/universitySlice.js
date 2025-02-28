import { createSlice } from "@reduxjs/toolkit";

const universitySlice = createSlice({
  name: "university",
  initialState: {
    autoUniversitysAssign: false,
    curUniversity: {},
    curCountry: "All",
  },
  reducers: {
    setUniversityCurCountry: (state, action) => {
      state.curCountry = action.payload;
    },
    setAutoUniversitysAssign: (state, action) => {
      state.autoUniversitysAssign = action.payload;

      if (!action.payload) {
        state.curUniversity = {};
      }
    },
    setCurUniversity(state, action) {
      state.curUniversity = action.payload;

      if (action.payload) {
        state.autoUniversitysAssign = true;
      }
    },
    updateCurUniversity(state, action) {
      state.curUniversity = action.payload;
    },
    updateCurUniversityCourses(state, action) {
      state.curUniversity.courses = action.payload;
    },
  },
});

export const {
  setAutoUniversitysAssign,
  setCurUniversity,
  updateCurUniversity,
  updateCurUniversityCourses,
  setUniversityCurCountry,
} = universitySlice.actions;

export default universitySlice.reducer;
