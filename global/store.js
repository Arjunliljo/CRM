import { configureStore } from "@reduxjs/toolkit";
import generalSlice from "./generalSlice";
import leadsSlice from "./leadsSlice";

const store = configureStore({
  reducer: {
    general: generalSlice,
    leads: leadsSlice,
  },
});

export default store;
