import { configureStore } from "@reduxjs/toolkit";
import generalSlice from "./generalSlice";
import leadsSlice from "./leadsSlice";
import userSlice from "./userSlice";
import studentsSlice from "./studentsSlice";
import universitySlice from "./universitySlice";
import branchSlice from "./branchSlice";
import coreSlice from "./coreSlice";

const store = configureStore({
  reducer: {
    general: generalSlice,
    leads: leadsSlice,
    user: userSlice,
    students: studentsSlice,
    universitys: universitySlice,
    branchmanage: branchSlice,
    core: coreSlice,
  },
});

export default store;
