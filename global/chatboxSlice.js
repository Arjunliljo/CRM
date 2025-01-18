import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [
    {
      id: 1,
      name: "Arun",
      message: "Hi Aswathi, I'd like to invite you to...",
      time: "9:30pm",
      avatar: "https://example.com/avatar.jpg",
      unread: true,
    },
    {
      id: 2,
      name: "John",
      message: "Hello Aswathi, I wanted to reach out...",
      time: "8:15pm",
      avatar: "https://example.com/avatar2.jpg",
    },
  ],
  selectedMessage: null,
  autoMarkAsRead: true,
};

const chatboxSlice = createSlice({
  name: "chatbox",
  initialState,
  reducers: {
    setSelectedMessage: (state, action) => {
      state.selectedMessage = action.payload;

      if (action.payload && state.autoMarkAsRead) {
        const message = action.payload;
        message.unread = false;
      }
    },
    setAutoMarkAsRead: (state, action) => {
      state.autoMarkAsRead = action.payload;

      if (!action.payload) {
        state.selectedMessage = null;
      }
    },
  },
});

export const { setSelectedMessage, setAutoMarkAsRead } = chatboxSlice.actions;

export default chatboxSlice.reducer;
