import { createSlice } from "@reduxjs/toolkit";

const generalSlice = createSlice({
  name: "general",
  initialState: {
    autoGeneralsAssign: true,
    curGeneral: {},
  },

  reducers: {
    setAutoGeneralsAssign: (state, action) => {
      state.autoGeneralsAssign = action.payload;

      if (!action.payload) {
        state.curGeneral = {};
      }
    },
    setCurGeneral(state, action) {
      state.curGeneral = action.payload;

      if (action.payload) {
        state.autoGeneralsAssign = true;
      }
    },
  },
});

export const { setAutoGeneralsAssign, setCurGeneral } = generalSlice.actions;

export default generalSlice.reducer;
