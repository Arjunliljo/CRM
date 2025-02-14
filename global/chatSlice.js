import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    autoChatsAssign: false,
    chats: [],
    selectedMessage: null,
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
    setSelectedMessage(state, action) {
        state.selectedMessage = action.payload;
        // If payload contains a chat id and message data
        if (action.payload?.chatId) {
            // Find the chat in chats array
            const chat = state.chats.find(chat => chat._id === action.payload.chatId);
            if (chat) {
                // Add the new message to chat messages array
                console.log(chat.messages, "chat");
                chat.messages.push(action.payload);
            }
        }
    },
  },
});

export const { setAutoChatsAssign, setChats, setSelectedMessage } = chatSlice.actions;

export default chatSlice.reducer;