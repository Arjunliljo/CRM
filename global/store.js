import { configureStore } from "@reduxjs/toolkit";
import generalSlice from "./generalSlice";
import leadsSlice from "./leadsSlice";
import userSlice from "./userSlice";
import studentsSlice from "./studentsSlice";
import universitySlice from "./universitySlice";
import branchSlice from "./branchSlice";
import coreSlice from "./coreSlice";
import creationSlice from "./creationSlice";
import profileSlice from "./profileSlice";
import statusSlice from "./statusSlice";
import usersSlice from "./usersSlice"
import authSlice from "./authSlice"
import chatSlice from "./chatSlice"

const store = configureStore({
  reducer: {
    general: generalSlice,
    leads: leadsSlice,
    user: userSlice,
    students: studentsSlice,
    universitys: universitySlice,
    branchmanage: branchSlice,
    core: coreSlice,
    creation: creationSlice,
    profile: profileSlice,
    status: statusSlice,
    users:usersSlice,
    auth:authSlice,
    chat:chatSlice
  },
});

export default store;
