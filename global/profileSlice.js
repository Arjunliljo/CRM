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
    mainStatuses: [],
    selectedTabs: [],
    selectedRoles: [],
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
    setProfileEmployeeId: (state, action) => {
      state.employeeId = action.payload;
    },
    setProfileAddressOne: (state, action) => {
      state.addressOne = action.payload;
    },
    setProfileAddressTwo: (state, action) => {
      state.addressTwo = action.payload;
    },
    setProfileMainStatus: (state, action) => {
      state.mainStatuses = action.payload;
    },
    setSelectedTabs: (state, action) => {
      state.selectedTabs = action.payload;
    },
    setSelectedRoles: (state, action) => {
      state.selectedRoles = action.payload;
    },

    //reset
    resetProfile: (state) => {
      return {
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
        mainStatuses: [],
        selectedTabs: [],
        selectedRoles: [],
      };
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
  setProfileMainStatus,
  setSelectedTabs,
  setSelectedRoles,
  resetProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
