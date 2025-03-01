import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "./socketConfig";
import { markMessagesAsRead, updateChats, updateSelectedMessage } from "../global/chatSlice";
import { refetchChats } from "../src/apiHooks/useChats";

function SocketProvider({ children }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const selectedMessage = useSelector((state) => state.chat.selectedMessage);

  useEffect(() => {
    if (!user?._id) return;
    // Connect and authenticate socket

    socket.connect();
    socket.emit("setup", user._id);

    // Listen for new messages
    socket.on("newMessage", (data) => {
      console.log("New message received from socket :", data);

      // Update Redux state immediately
      dispatch(updateSelectedMessage(data.message));
      dispatch(
        updateChats({
          chatId: data.chatId,
          message: data.message,
        })
      );

        // If this chat is currently selected, mark message as read
        if (selectedMessage && selectedMessage.id === data.chatId) {
          socket.emit("markMessagesAsRead", {
            chatId: data.chatId,
            userId: user._id
          });
        }

      refetchChats();
    });

  // Listen for messages marked as read
  socket.on("messagesRead", (data) => {
    console.log("Messages marked as read :", data);
    dispatch(markMessagesAsRead(data.chatId));
  });


    return () => {
      socket.off("newMessage");
      socket.off("messagesRead");
      socket.disconnect();
    };
  }, [dispatch, user,selectedMessage]);

  return children;
}

export default SocketProvider;
