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
      console.log("action.payload", action.payload);

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
    },
    markMessagesAsRead: (state, action) => {
      const chatId = action.payload;
      const userId = JSON.parse(localStorage.getItem('user'))?._id;

      // Update in chats array
      const chatIndex = state.chats.findIndex(chat => chat._id === chatId);
      if (chatIndex !== -1) {
        state.chats[chatIndex].messages = state.chats[chatIndex].messages.map(message => {
          if (message.sender !== userId) {
            return { ...message, isRead: true };
          }
          return message;
        });
      }

      // Update in selectedMessage if applicable
      if (state.selectedMessage && state.selectedMessage.id === chatId) {
        state.selectedMessage.message = state.selectedMessage.message.map(message => {
          if (message.sender !== userId) {
            return { ...message, isRead: true };
          }
          return message;
        });
      }
    }
  }
});

// Export all actions
export const {
  setChats,
  setSelectedMessage,
  updateSelectedMessage,
  updateChats,
  markMessagesAsRead
} = chatSlice.actions;

export default chatSlice.reducer;