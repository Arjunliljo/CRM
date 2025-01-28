import { createSlice } from "@reduxjs/toolkit";

const statusSlice = createSlice({
  name: "status",
  initialState: {
    statuses: [],
    tabs: [],
    countryBasedStatuses: [],
    applicationStatus: [],
  },
  reducers: {
    setStatuses: (state, action) => {
      state.statuses = action.payload;
      //   state.tabs = action.payload.filter((status) => status.isTab);
      //   state.countryBasedStatuses = action.payload.filter(
      //     (status) => status.isCountryBased
      //   );
      //   state.applicationStatus = action.payload.filter(
      //     (status) => status.isApplication
      //   );
    },
  },
});

export const { setStatuses, setTabs } = statusSlice.actions;

export default statusSlice.reducer;
