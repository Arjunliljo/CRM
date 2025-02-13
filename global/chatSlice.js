import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    autoChatsAssign: false,
    chats: [],
  },
  reducers: {
    setAutoChatsAssign: (state, action) => {
      state.autoChatsAssign = action.payload;

      if (!action.payload) {
        state.chats = [];
      }
    },
    setChats(state, action) {
      state.chats = action.payload;

      if (action.payload) {
        state.autoChatsAssign = true;
      }
    },
  },
});

export const { setAutoChatsAssign, setChats } = chatSlice.actions;

export default chatSlice.reducer;