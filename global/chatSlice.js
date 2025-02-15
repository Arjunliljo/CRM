import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    selectedMessage: null,
    chats: [],
  },
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setSelectedMessage: (state, action) => {
      state.selectedMessage = action.payload;
    },
    updateSelectedMessage: (state, action) => {

      if (state.selectedMessage) {
        state.selectedMessage.message.push({
          content: action.payload.content,
          sender: action.payload.sender,
          time: action.payload.time
        });
      }
    },
    updateChats: (state, action) => {
      const { chatId, message } = action.payload;
      const chatIndex = state.chats.findIndex(chat => chat._id === chatId);
      if (chatIndex !== -1) {
        // Remove the console.log and handle the message object directly
        state.chats[chatIndex].messages.push({
          chatId: message.chatId,
          content: message.content,
          sender: message.sender,
          time: message.time
        });
        state.chats[chatIndex].lastMessage = {
          chatId: message.chatId,
          content: message.content,
          sender: message.sender,
          time: message.time
        };
      }
    }
  },
});

// Export all actions
export const {
  setChats,
  setSelectedMessage,
  updateSelectedMessage,
  updateChats
} = chatSlice.actions;

export default chatSlice.reducer;