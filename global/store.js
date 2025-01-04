import { configureStore } from "@reduxjs/toolkit";
import generalSlice from "./generalSlice";

const store = configureStore({
  reducer: {
    general: generalSlice,
  },
});

export default store;
