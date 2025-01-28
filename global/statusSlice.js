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
      state.tabs = action.payload.filter((status) => status.isTab);
    },
  },
});

export const { setStatuses, setTabs } = statusSlice.actions;

export default statusSlice.reducer;
