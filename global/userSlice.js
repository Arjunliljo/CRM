import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    autoUserAssign: true,
    curUser: {},
  },
  reducers: {
    setAutoUserAssign: (state, action) => {
      state.autoUserAssign = action.payload;

      if (!action.payload) {
        state.curLead = {};
      }
    },
    setCurUser(state, action) {
      state.curUser = action.payload;

      if (action.payload) {
        state.autoUserAssign = true;
      }
    },
  },
});

export const { setAutoUserAssign, setCurUser } = userSlice.actions;

export default userSlice.reducer;
