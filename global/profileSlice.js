import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    countries: [],
    role: {},
    branches: [],
    password: "",
    autoAssign: false,
    email: "",
    name: "",
    contactNumber: "",
    employeeId: "",
    addressOne: "",
    addressTwo: "",
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
    setProfileAutoAssign: (state, action) => {
      state.autoAssign = action.payload;
    },

    setProfilePassword: (state, action) => {
      state.password = action.payload;
    },
    setProfileEmail: (state, action) => {
      state.email = action.payload;
    },
    setProfileContactNumber: (state, action) => {
      state.contactNumber = action.payload;
    },
    setProfileName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const {
  setProfileCountries,
  setProfileRole,
  setProfileBranches,
  setProfileAutoAssign,
  setProfilePassword,
  setProfileEmail,
  setProfileContactNumber,
  setProfileEmployeeId,
  setProfileAddressOne,
  setProfileAddressTwo,
  setProfileName,
} = profileSlice.actions;

export default profileSlice.reducer;
