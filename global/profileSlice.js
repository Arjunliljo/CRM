import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    countries: [],
    role: {},
    branches: [],
    loginId: {},
    password: {},
  },
  reducers: {
    setProfileCountries: (state, action) => {
      state.countries = action.payload;
    },
    setProfileRole: (state, action) => {
      state.role = action.payload;
    },
    setProfileBranches: (state, action) => {
      state.branches = action.payload;
    },
  },
});

export const { setProfileCountries, setProfileRole, setProfileBranches } =
  profileSlice.actions;

export default profileSlice.reducer;
