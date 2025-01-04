import { createSlice, configureStore } from "@reduxjs/toolkit";

const generalSlice = createSlice({
  name: "general",
  initialState: {},
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = generalSlice.actions;

export default generalSlice.reducer;
