import { configureStore } from "@reduxjs/toolkit";
import generalSlice from "./generalSlice";
import leadsSlice from "./leadsSlice";
import userSlice from "./userSlice";
import studentsSlice from "./studentsSlice";
import universitySlice from "./universitySlice";
import offerLetterSlice from "./offerlettersSlice";
import paymentsSlice from "./paymentsSlice";
import branchSlice from "./branchSlice";

const store = configureStore({
  reducer: {
    general: generalSlice,
    leads: leadsSlice,
    user: userSlice,
    students: studentsSlice,
    universitys: universitySlice,
    offerletters: offerLetterSlice,
    payments: paymentsSlice,
    branchmanage: branchSlice,
  },
});

export default store;
