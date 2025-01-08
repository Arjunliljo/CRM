import { configureStore } from "@reduxjs/toolkit";
import generalSlice from "./generalSlice";
import leadsSlice from "./leadsSlice";
import userSlice from "./userSlice";
import studentsSlice from "./studentsSlice";

const store = configureStore({
  reducer: {
    general: generalSlice,
    leads: leadsSlice,
    user: userSlice,
    students: studentsSlice,
  },
});

export default store;
