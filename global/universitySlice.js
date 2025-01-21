import { createSlice } from "@reduxjs/toolkit";

const universitySlice = createSlice({
  name: "university",
  initialState: {
    autoUniversitysAssign: false,
    curUniversity: {},
  },
  reducers: {
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
  },
});

export const { setAutoUniversitysAssign, setCurUniversity } =
  universitySlice.actions;

export default universitySlice.reducer;
