import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    autoUserAssign: false,
    curUser: {},
  },
  reducers: {
    setAutoUserAssign: (state, action) => {
      state.autoUserAssign = action.payload;

      if (!action.payload) {
        state.curUser = {};
      }
    },
    setCurUser(state, action) {
      state.curUser = action.payload;

      if (action.payload) {
        state.autoUserAssign = true;
      } else {
        state.autoUserAssign = false;
      }
    },
  },
});

export const { setAutoUserAssign, setCurUser } = userSlice.actions;

export default userSlice.reducer;
