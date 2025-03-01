import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    autoUserAssign: false,
    curUser: {},
    curCountry: "All",
    curRole: "All",
    curBranch: "All",
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
    setUserCurCountry: (state, action) => {
      state.curCountry = action.payload;
    },
    setUserCurRole: (state, action) => {
      state.curRole = action.payload;
    },
    setUserCurBranch: (state, action) => {
      state.curBranch = action.payload;
    },
  },
});

export const { setAutoUserAssign, setCurUser, setUserCurCountry, setUserCurRole, setUserCurBranch } = userSlice.actions;

export default userSlice.reducer;
