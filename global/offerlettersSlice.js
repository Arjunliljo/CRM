import { createSlice } from "@reduxjs/toolkit";

const offerlettersSlice = createSlice({
  name: "offerletters",
  initialState: {
    autoOfferlettersAssign: true,
    curLead: {},
  },
  reducers: {
    setAutoOfferlettersAssign: (state, action) => {
      state.autoOfferlettersAssign = action.payload;

      if (!action.payload) {
        state.curOfferletter = {};
      }
    },
    setCurOfferletter(state, action) {
      state.curOfferletter = action.payload;

      if (action.payload) {
        state.autoOfferlettersAssign = true;
      }
    },
  },
});

export const { setAutoOfferlettersAssign, setCurOfferletter } =
  offerlettersSlice.actions;

export default offerlettersSlice.reducer;
