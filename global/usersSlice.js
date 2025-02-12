import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    // autoUsersAssign: false,
    users: [], 
  },
  reducers: {
    // setAutoUsersAssign: (state, action) => {
    //   state.autoUsersAssign = action.payload;

    //   if (!action.payload) {
    //     state.users = [];
    //   }
    // },
    setUsers(state, action) {
      state.users = action.payload;
    },
  },
});

export const {  setUsers } = usersSlice.actions; 

export default usersSlice.reducer;
