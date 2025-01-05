import { createSlice, configureStore } from "@reduxjs/toolkit";

const leadsSlice = createSlice({
  name: "leads",
  initialState: {},
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = leadsSlice.actions;

export default leadsSlice.reducer;
